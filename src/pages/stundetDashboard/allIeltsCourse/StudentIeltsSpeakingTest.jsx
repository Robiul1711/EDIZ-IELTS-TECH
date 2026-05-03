import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import TestHeader from "@/components/common/TestHeader";
import { toast } from "react-hot-toast";
import {
  Mic,
  RotateCcw,
  Send,
  Volume2,
  Clock,
  StopCircle,
  CheckCircle2,
} from "lucide-react";

const StudentIeltsSpeakingTest = () => {
  const { test_no, part_no } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookNo = searchParams.get("book_no") || searchParams.get("book");
  const type = searchParams.get("type") || "academic";

  const { data: fetchResult, isLoading } = useApiQuery({
    queryKey: ["speaking-test-details", test_no, bookNo, type],
    url: `/ielts/speaking/tests/1`, // Fetching part 1 to get the whole test data if the API allows
    params: { book_no: bookNo, test_no: test_no, type },
    secure: true,
  });

  const {
    mutate: submitTest,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useApiMutation({
    url: "/ielts/speaking/tests/submit",
    method: "POST",
    secure: true,
  });

  const [activePart, setActivePart] = useState(0);
  const [startTime] = useState(Date.now());
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const testParts = fetchResult?.data || [];
  const testPart = testParts[activePart] || {};
  // The questions are nested: array of objects, each containing a 'questions' array
  const questions = testPart?.questions?.flatMap(group => group.questions) || [];

  // Sync activePart with URL param on mount
  useEffect(() => {
    if (part_no) {
      setActivePart(parseInt(part_no) - 1);
    }
  }, [part_no]);

  // Recording Logic
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/mp3" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
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
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<[^>]*>/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Voices might not be loaded yet, handle it
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

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    if (!audioBlob) {
      toast.error("Please record your answer first!");
      return;
    }

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const formData = new FormData();
    formData.append("book_no", bookNo);
    formData.append("test_no", test_no);
    formData.append("part_no", testPart?.part_no || activePart + 1);
    formData.append("type", type);
    formData.append("time_spent", timeSpent);
    formData.append("audio", audioBlob, `speaking_part${activePart + 1}.mp3`);

    submitTest(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse">
            Initializing Lab...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 overflow-hidden font-sans">
      <TestHeader
        durationInSeconds={testPart?.duration_seconds || 900}
        onExit="/dashboard/ielts/speaking"
      />

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Side: Questions & Prompts */}
        <div className="md:w-1/2 h-full overflow-y-auto p-6 lg:p-12 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-10 pb-20">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase">
                <Volume2 size={12} />
                Part {testPart?.part_no || activePart + 1} Speaking
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {testPart?.title || "Speaking Test Part"}
              </h1>
            </header>

            {/* Questions List */}
            <div className="space-y-8">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md group relative"
                >
                  <button
                    onClick={() => speakText(q.text)}
                    className="absolute top-6 right-6 p-3 bg-white dark:bg-slate-900 rounded-2xl text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                    title="Listen to question"
                    >
                    <Volume2 size={16} />
                  </button>

                  <div className="flex items-start gap-5">
                    
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-xs font-bold text-indigo-600 shadow-sm border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-110">
                      {q.serial_number || idx + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div
                        className="text-slate-800 dark:text-slate-100 text-lg leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{ __html: q.text }}
                      />
                      {q.explanation && (
                        <div
                          className="text-slate-500 dark:text-slate-400 text-sm italic"
                          dangerouslySetInnerHTML={{ __html: q.explanation }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Recorder Control */}
        <div className="flex-1 h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-10 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-md text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Record Your Answer
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Please speak clearly into your microphone.
              </p>
            </div>

            {/* Microphone / Wave UI */}
            <div className="relative flex items-center justify-center">
              {isRecording && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-indigo-500/10 rounded-full animate-ping" />
                  <div className="w-48 h-48 bg-indigo-500/20 rounded-full animate-ping animation-delay-500" />
                </div>
              )}

              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isSubmitted}
                className={`relative w-40 h-40 ${isRecording ? "bg-red-500 shadow-red-200" : "bg-indigo-600 shadow-indigo-200"} text-white rounded-[3rem] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl group z-20`}
              >
                {isRecording ? (
                  <>
                    <StopCircle size={48} fill="currentColor" />
                    <span className="mt-3 text-[10px] font-black uppercase tracking-widest">
                      Stop Recording
                    </span>
                  </>
                ) : (
                  <>
                    <Mic size={48} className="group-hover:animate-bounce" />
                    <span className="mt-3 text-[10px] font-black uppercase tracking-widest">
                      Start Recording
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Status & Timer */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <Clock
                  size={16}
                  className={isRecording ? "text-red-500" : "text-indigo-600"}
                />
                <span
                  className={`text-xl font-mono font-bold tracking-widest ${isRecording ? "text-red-500" : "text-slate-700 dark:text-slate-200"}`}
                >
                  {formatDuration(recordingDuration)}
                </span>
              </div>

              {audioUrl && !isRecording && (
                <div className="w-full  p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800/40 flex items-center justify-between">
                  <audio src={audioUrl} controls className="h-8 " />
                  <button
                    onClick={() => {
                      setAudioBlob(null);
                      setAudioUrl(null);
                      setRecordingDuration(0);
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Submission & Navigation */}
      <footer className="h-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center px-6 lg:px-12 z-50 gap-6">
        {/* Tab System */}
        <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar py-2">
          {testParts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActivePart(idx);
                // Clear current recording state when switching? 
                // Maybe keep it if we want to support multi-part submission
                // But for now let's just switch view
              }}
              className={`flex-shrink-0 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] transition-all border ${
                activePart === idx
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "bg-white dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-slate-800 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              Part {p.part_no || idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!audioBlob || isSubmitting || isSubmitted}
          className="group relative flex items-center gap-4 px-10 h-14 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-indigo-100 dark:shadow-none uppercase text-[10px] tracking-[0.2em]"
        >
          <span>
            {isSubmitting
              ? "Uploading..."
              : isSubmitted
                ? "Submitted"
                : `Submit Part ${testPart?.part_no || activePart + 1}`}
          </span>
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
            <Send size={18} strokeWidth={2.5} />
          </div>
          {isSubmitted && (
            <CheckCircle2 size={22} className="text-emerald-400 ml-2" />
          )}
        </button>
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
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
      `}</style>
    </div>
  );
};

export default StudentIeltsSpeakingTest;
