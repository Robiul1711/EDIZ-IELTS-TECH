import React, { useState, useEffect, useRef } from "react";
import { useApiMutation } from "@/hooks/apiMutation";
import { toast } from "react-hot-toast";
import {
  Mic,
  RotateCcw,
  Send,
  Volume2,
  Clock,
  StopCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  UserCircle2,
  FileText,
} from "lucide-react";

const FullTestSpeaking = ({ data: testParts, session, onComplete }) => {
  const {
    mutateAsync: submitSingleAnswer,
  } = useApiMutation({
    url: "/ielts/full-test/submit-section",
    method: "POST",
    secure: true,
  });

  const [isSubmittingNext, setIsSubmittingNext] = useState(false);

  // State variables
  const [activePart, setActivePart] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { serial_number: { blob, url, duration } }
  const [startTime] = useState(Date.now());

  // Recording/Interaction states
  const [step, setStep] = useState("idle"); // 'idle', 'speaking', 'thinking', 'ready', 'recording', 'recorded'
  const [thinkingTime, setThinkingTime] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const testPart = testParts[activePart] || {};
  const questions =
    testPart?.questions?.flatMap((group) => group.questions) || [];
  const currentQuestion = questions[currentQuestionIndex];

  const totalQuestionsInTest = testParts.reduce((acc, part) => {
    return acc + (part?.questions?.flatMap((g) => g.questions)?.length || 0);
  }, 0);

  const isLastQuestionOfTest =
    activePart === testParts.length - 1 &&
    currentQuestionIndex === questions.length - 1;

  // When question changes, reset state
  useEffect(() => {
    if (!currentQuestion) return;
    window.speechSynthesis.cancel();
    const existingAnswer = answers[currentQuestion.serial_number];
    if (existingAnswer) {
      setStep("recorded");
    } else {
      setStep("idle");
    }
  }, [currentQuestionIndex, activePart, currentQuestion, answers]);

  // Thinking countdown
  useEffect(() => {
    let interval;
    if (step === "thinking" && thinkingTime > 0) {
      interval = setInterval(() => {
        setThinkingTime((prev) => prev - 1);
      }, 1000);
    } else if (step === "thinking" && thinkingTime === 0) {
      setStep("ready");
    }
    return () => clearInterval(interval);
  }, [step, thinkingTime]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    setStep("speaking");
    const cleanText = text.replace(/<[^>]*>/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);

    utterance.onend = () => {
      setStep("thinking");
      setThinkingTime(5);
    };

    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const englishVoice =
        voices.find((v) => v.lang.startsWith("en-GB")) ||
        voices.find((v) => v.lang.startsWith("en-US")) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];

      if (englishVoice) utterance.voice = englishVoice;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      getVoices();
    } else {
      window.speechSynthesis.onvoiceschanged = getVoices;
    }
  };

  const startRecording = async () => {
    try {
      window.speechSynthesis.cancel();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.serial_number]: {
            blob,
            url,
            duration: recordingDuration,
          },
        }));
      };

      mediaRecorderRef.current.start();
      setStep("recording");
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      toast.error("Microphone access denied or error occurring.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && step === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      clearInterval(timerRef.current);
      setStep("recorded");
    }
  };

  const deleteRecording = () => {
    if (!currentQuestion) return;
    const serial = currentQuestion.serial_number;
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[serial];
      return newAnswers;
    });
    setStep("idle");
    setRecordingDuration(0);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = async () => {
    if (step === "recording") stopRecording();

    const currentAnswer = answers[currentQuestion.serial_number];
    if (currentAnswer && !currentAnswer.isSubmitted) {
      setIsSubmittingNext(true);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const formData = new FormData();
      formData.append("session_id", session.id);
      formData.append("skill", "speaking");
      formData.append("serial_number", currentQuestion.serial_number);
      formData.append("time_spent", timeSpent);
      formData.append(
        `answer[${currentQuestion.serial_number}]`,
        currentAnswer.blob,
        `speaking_${currentQuestion.serial_number}.mp3`,
      );

      try {
        await submitSingleAnswer(formData);
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.serial_number]: {
            ...prev[currentQuestion.serial_number],
            isSubmitted: true,
          },
        }));
      } catch (err) {
        toast.error("Failed to submit answer. Please try again.");
        setIsSubmittingNext(false);
        return;
      }
      setIsSubmittingNext(false);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (activePart < testParts.length - 1) {
      setActivePart((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrev = () => {
    if (step === "recording") stopRecording();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (activePart > 0) {
      const prevPart = testParts[activePart - 1];
      const prevQuestions =
        prevPart?.questions?.flatMap((group) => group.questions) || [];
      setActivePart((prev) => prev - 1);
      setCurrentQuestionIndex(
        prevQuestions.length > 0 ? prevQuestions.length - 1 : 0,
      );
    }
  };

  const handleSubmit = async () => {
    if (step === "recording") stopRecording();

    if (Object.keys(answers).length === 0) {
      toast.error("Please record at least one answer before submitting.");
      return;
    }

    const currentAnswer = answers[currentQuestion.serial_number];
    if (currentAnswer && !currentAnswer.isSubmitted) {
      setIsSubmittingNext(true);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const formData = new FormData();
      formData.append("session_id", session.id);
      formData.append("skill", "speaking");
      formData.append("serial_number", currentQuestion.serial_number);
      formData.append("time_spent", timeSpent);
      formData.append(
        `answer[${currentQuestion.serial_number}]`,
        currentAnswer.blob,
        `speaking_${currentQuestion.serial_number}.mp3`,
      );

      try {
        await submitSingleAnswer(formData);
      } catch (err) {
        toast.error("Failed to submit answer. Please try again.");
        setIsSubmittingNext(false);
        return;
      }
      setIsSubmittingNext(false);
    }

    onComplete();
  };

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.serial_number]
    : null;

  return (
    <div className="flex flex-col flex-1 overflow-hidden font-sans">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Side: Avatar & Question */}
        <div className="md:w-1/2 h-full overflow-y-auto p-6 lg:p-12 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 custom-scrollbar flex flex-col items-center justify-center">
          <div className="w-full max-w-lg space-y-8 pb-10">
            <header className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-xs font-black tracking-widest uppercase">
                Part {testPart?.part_no || activePart + 1}
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {testPart?.title || "Speaking Component"}
              </h1>
            </header>

            <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden">
              <div
                className={`w-32 h-32 bg-indigo-50 dark:bg-indigo-900/40 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-700 shadow-lg relative overflow-hidden transition-all duration-300 ${step === "speaking" ? "ring-4 ring-indigo-400/50 scale-110" : ""}`}
              >
                <UserCircle2
                  size={80}
                  strokeWidth={1.5}
                  className={`text-indigo-500 ${step === "speaking" ? "animate-pulse" : ""}`}
                />
              </div>

              <div className="mt-8 w-full text-center space-y-4">
                <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-500 dark:text-slate-300">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="min-h-[80px] flex items-center justify-center">
                  <h3
                    className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: currentQuestion?.text }}
                  />
                </div>
              </div>

              <button
                onClick={() => speakText(currentQuestion?.text)}
                disabled={step === "speaking" || step === "recording"}
                className={`mt-8 px-8 py-3 rounded-2xl flex items-center gap-3 transition-all font-bold ${
                  step === "speaking"
                    ? "bg-indigo-100 text-indigo-400 dark:bg-indigo-900/30 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:-translate-y-1"
                }`}
              >
                <Volume2 size={20} />
                {step === "speaking" ? "Speaking..." : "Listen to Question"}
              </button>
            </div>

            {testPart?.cue_card && (
              <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-3xl shadow-sm">
                <h4 className="text-amber-800 dark:text-amber-200 font-bold mb-3 flex items-center gap-2">
                  <FileText size={18} /> Cue Card
                </h4>
                <div
                  className="text-slate-700 dark:text-slate-300 prose prose-sm dark:prose-invert font-medium"
                  dangerouslySetInnerHTML={{ __html: testPart.cue_card }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Recorder Control */}
        <div className="flex-1 h-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-6 lg:p-10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-md text-center space-y-10">
            {/* Status indicator */}
            <div className="h-16 flex items-center justify-center">
              {step === "idle" && (
                <p className="text-slate-400 font-medium animate-pulse">
                  Click Listen to Question to start
                </p>
              )}
              {step === "speaking" && (
                <p className="text-indigo-500 font-bold text-lg animate-pulse">
                  Listen carefully...
                </p>
              )}
              {step === "thinking" && (
                <div className="flex flex-col items-center">
                  <p className="text-amber-500 font-bold text-xl">
                    Thinking Time
                  </p>
                  <p className="text-amber-600 font-black text-4xl">
                    {thinkingTime}s
                  </p>
                </div>
              )}
              {step === "ready" && (
                <p className="text-emerald-500 font-bold text-lg animate-pulse">
                  Ready to Record!
                </p>
              )}
              {step === "recorded" && (
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-lg">
                  <CheckCircle2 size={24} />
                  Answer Recorded
                </div>
              )}
            </div>

            {/* Microphone / Wave UI */}
            <div className="relative flex items-center justify-center h-56">
              {step === "recording" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 bg-red-500/10 rounded-full animate-ping" />
                  <div className="w-40 h-40 bg-red-500/20 rounded-full animate-ping animation-delay-500" />
                </div>
              )}

              <button
                onClick={step === "recording" ? stopRecording : startRecording}
                disabled={isSubmittingNext || step === "speaking"}
                className={`relative w-40 h-40 rounded-[3rem] flex flex-col items-center justify-center transition-all duration-300 active:scale-95 shadow-2xl group z-20 ${
                  step === "recording"
                    ? "bg-red-500 text-white shadow-red-200"
                    : step === "speaking"
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:scale-105"
                }`}
              >
                {step === "recording" ? (
                  <>
                    <StopCircle size={48} fill="currentColor" />
                    <span className="mt-3 text-[10px] font-black uppercase tracking-widest">
                      Stop
                    </span>
                  </>
                ) : (
                  <>
                    <Mic
                      size={48}
                      className={
                        step === "ready" ||
                        step === "idle" ||
                        step === "recorded"
                          ? "group-hover:animate-bounce"
                          : ""
                      }
                    />
                    <span className="mt-3 text-[10px] font-black uppercase tracking-widest">
                      {currentAnswer ? "Record Again" : "Record"}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Status & Timer */}
            <div className="flex flex-col items-center gap-4 h-24">
              {step === "recording" && (
                <div className="flex items-center gap-3 px-6 py-3 bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-sm border border-red-100 dark:border-red-800/40">
                  <Clock size={16} className="text-red-500" />
                  <span className="text-xl font-mono font-bold tracking-widest text-red-500">
                    {formatDuration(recordingDuration)}
                  </span>
                </div>
              )}

              {currentAnswer && step !== "recording" && (
                <div className="w-full p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/40 flex items-center justify-between">
                  <audio
                    src={currentAnswer.url}
                    controls
                    className="h-10 w-full rounded-lg"
                  />
                  <button
                    onClick={deleteRecording}
                    className="p-3 text-slate-400 hover:text-red-500 transition-colors ml-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700"
                    title="Delete Recording"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="h-20 md:h-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-12 z-50">
        {/* <button
          onClick={handlePrev}
          disabled={activePart === 0 && currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} />
          <span className="hidden md:inline">Previous</span>
        </button> */}

        <div className="text-center hidden sm:block">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
            Overall Progress
          </div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {Object.keys(answers).length} of {totalQuestionsInTest} Answered
          </div>
        </div>

        {isLastQuestionOfTest ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmittingNext}
            className="group relative flex items-center gap-3 px-6 md:px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-200 dark:shadow-none uppercase text-xs tracking-widest"
          >
            <span>{isSubmittingNext ? "Submitting..." : "Submit Test"}</span>
            {!isSubmittingNext && (
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <Send size={16} strokeWidth={2.5} />
              </div>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={isSubmittingNext}
            className="flex items-center gap-2 px-6 md:px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50"
          >
            <span className="hidden md:inline">
              {isSubmittingNext ? "Saving..." : "Next"}
            </span>
            <ChevronRight size={20} />
          </button>
        )}
      </footer>

      <style jsx="true">{`
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
      `}</style>
    </div>
  );
};

export default FullTestSpeaking;
