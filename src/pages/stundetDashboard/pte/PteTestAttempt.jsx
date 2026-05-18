import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { File, Mic, Clock, ChevronLeft, ChevronRight, Send, Loader2, StopCircle, RotateCcw, Play, Volume2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const PteTestAttempt = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const { data: attemptData, isLoading, isError } = useQuery({
    queryKey: ["pte-attempt", attemptId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/pte/test/attempt/${attemptId}`);
      return response.data.data;
    },
    enabled: !!attemptId,
  });

  // Derived questions from sections
  const questions = useMemo(() => {
    if (!attemptData?.sections) return [];
    return attemptData.sections.reduce((acc, section) => {
      return [...acc, ...section.questions];
    }, []);
  }, [attemptData]);

  // Sync timeLeft with fetched data once
  useEffect(() => {
    if (attemptData && (timeLeft === 0 || timeLeft === null)) {
      const remainingTime = attemptData.attempt?.remaining_time_seconds ?? attemptData.remaining_time_seconds;
      if (remainingTime !== undefined && remainingTime !== null) {
        setTimeLeft(Number(remainingTime));
      }
    }
  }, [attemptData, timeLeft]);

  // Drag and Drop State and Handlers
  const [userAnswers, setUserAnswers] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (questions.length > 0 && Object.keys(userAnswers).length === 0) {
      const initialAnswers = {};
      let hasComplexQuestions = false;
      questions.forEach((q) => {
        if (q.task_type === "re_order_paragraphs") {
          initialAnswers[q.id] = {
            source: [...q.content.paragraphs],
            target: [],
          };
          hasComplexQuestions = true;
        } else if (q.task_type === "fill_in_the_blanks_drag_drop") {
          initialAnswers[q.id] = {
            bank: [...q.content.all_options],
            blanks: {},
          };
          hasComplexQuestions = true;
        }
      });
      
      if (hasComplexQuestions) {
        setUserAnswers(initialAnswers);
      }
    }
  }, [questions]); // Only re-run when questions are loaded/changed

  const handleDragStart = (e, item, sourceList, questionId, index = null) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("sourceList", sourceList);
    e.dataTransfer.setData("draggedIndex", index);
    e.dataTransfer.setData("questionId", questionId.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetList, questionId, targetIndex = null) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
    const sourceList = e.dataTransfer.getData("sourceList");
    const draggedIndex = e.dataTransfer.getData("draggedIndex");
    const draggedQuestionId = e.dataTransfer.getData("questionId");

    if (draggedQuestionId !== questionId.toString()) return;

    setUserAnswers((prev) => {
      const current = prev[questionId] || {};
      
      if (targetList === "reorder_target" || targetList === "reorder_source") {
        let source = [...(current.source || [])];
        let target = [...(current.target || [])];

        // Remove from source list
        if (sourceList === "reorder_source") {
          source = source.filter((i, idx) => idx !== parseInt(draggedIndex));
        } else {
          target = target.filter((i, idx) => idx !== parseInt(draggedIndex));
        }

        // Add to target list
        if (targetList === "reorder_source") {
          source.push(item);
        } else {
          if (targetIndex !== null) {
            target.splice(targetIndex, 0, item);
          } else {
            target.push(item);
          }
        }
        return { ...prev, [questionId]: { ...current, source, target, task_type: "re_order_paragraphs" } };
      }

      if (targetList === "fiba_blank" || targetList === "fiba_bank") {
        let bank = [...(current.bank || [])];
        let blanks = { ...(current.blanks || {}) };

        // Remove from source
        if (sourceList === "fiba_bank") {
          bank = bank.filter((w) => w !== item);
        } else {
          const oldBlankId = e.dataTransfer.getData("fromBlank");
          if (oldBlankId) delete blanks[oldBlankId];
        }

        // Add to target
        if (targetList === "fiba_bank") {
          bank.push(item);
        } else {
          const oldWordInBlank = blanks[targetIndex];
          if (oldWordInBlank) bank.push(oldWordInBlank);
          blanks[targetIndex] = item;
        }
        return { ...prev, [questionId]: { ...current, bank, blanks, task_type: "fill_in_the_blanks_drag_drop" } };
      }

      return prev;
    });
  };

  const handleInputChange = (questionId, taskType, value, index = null) => {
    setUserAnswers((prev) => {
      const current = prev[questionId] || {};
      let updatedAnswer;

      if (index !== null) {
        updatedAnswer = { ...(current.answers || {}), [index]: value };
      } else if (taskType.includes("multiple_choice_multiple") || taskType === "highlight_incorrect_words") {
        const currentChoices = Array.isArray(current.answers) ? current.answers : [];
        updatedAnswer = currentChoices.includes(value)
          ? currentChoices.filter((c) => c !== value)
          : [...currentChoices, value];
      } else {
        updatedAnswer = value;
      }

      return {
        ...prev,
        [questionId]: { ...current, task_type: taskType, answers: updatedAnswer }
      };
    });
  };

  // Recording Logic
  const startRecording = async (questionId, taskType) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        
        // Save to userAnswers
        setUserAnswers(prev => ({
          ...prev,
          [questionId]: { ...prev[questionId], audio: blob, audioUrl: url, task_type: taskType }
        }));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      toast.error("Microphone access denied.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const resetRecording = (questionId) => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingDuration(0);
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], audio: null, audioUrl: null }
    }));
  };

  const submitAnswerMutation = useMutation({
    mutationFn: async ({ questionId, answers, timeTaken, audio }) => {
      let payload;
      let headers = {};

      if (audio) {
        payload = new FormData();
        payload.append("question_id", questionId);
        payload.append("answers", JSON.stringify(answers || {}));
        payload.append("time_taken", timeTaken);
        payload.append("audio", audio, `answer_${questionId}.webm`);
        // axios automatically sets multipart boundary
      } else {
        payload = {
          question_id: questionId,
          answers: answers || {},
          time_taken: timeTaken,
        };
      }

      const response = await axiosSecure.post(`/pte/test/submit-answer?pte_test_attempt_id=${attemptId}`, payload);
      return response.data;
    },
    onError: (error) => {
      console.error("Error submitting answer:", error);
      toast.error("Failed to save answer progress.");
    }
  });

  const completeTestMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.post(`/pte/test/attempt/${attemptId}/complete`);
      return response.data;
    },
    onError: (error) => {
      console.error("Error completing test:", error);
      toast.error("Failed to complete test.");
    }
  });

  const getFormattedAnswer = (questionId) => {
    const userAns = userAnswers[questionId];
    const question = questions.find(q => q.id === questionId);
    if (!userAns || !question) return null;

    const { task_type, target, blanks, answers } = userAns;

    if (task_type === "re_order_paragraphs") {
      return target.map(p => {
        return question.content.paragraphs.findIndex(orig => orig.text === p.text);
      });
    }

    if (task_type === "fill_in_the_blanks_drag_drop") {
      const formattedBlanks = {};
      for (const key in blanks) {
        formattedBlanks[String(Number(key) + 1)] = blanks[key];
      }
      return formattedBlanks;
    }

    if (
      task_type === "multiple_choice_single_answer_reading" ||
      task_type === "multiple_choice_single_answer_listening" ||
      task_type === "highlight_correct_summary" ||
      task_type === "select_missing_word"
    ) {
      return answers !== undefined ? [answers] : [];
    }

    return answers;
  };

  const saveAndNavigate = async (nextIndex) => {
    if (nextIndex === currentQuestionIndex) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const answers = getFormattedAnswer(currentQuestion.id);
    const audio = userAnswers[currentQuestion.id]?.audio;

    // Reset recording states for next question
    stopRecording();
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingDuration(0);

    submitAnswerMutation.mutate({
      questionId: currentQuestion.id,
      answers: answers || {},
      timeTaken: Math.max(timeTaken, 1),
      audio: audio
    });

    setCurrentQuestionIndex(nextIndex);
    setStartTime(Date.now());
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      saveAndNavigate(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      saveAndNavigate(currentQuestionIndex - 1);
    }
  };

  const performSubmission = async () => {
    if (hasSubmitted) return;
    setHasSubmitted(true);

    const currentQuestion = questions[currentQuestionIndex];
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const answers = getFormattedAnswer(currentQuestion.id);
    const audio = userAnswers[currentQuestion.id]?.audio;

    try {
      await submitAnswerMutation.mutateAsync({
        questionId: currentQuestion.id,
        answers: answers || {},
        timeTaken,
        audio
      });
      
      await completeTestMutation.mutateAsync();
      
      setShowCompletionModal(true);
      toast.success("Test completed successfully!");
    } catch (error) {
      setHasSubmitted(false); // Reset if failed to allow retry
      toast.error("Submission or completion failed. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setShowConfirmModal(true);
  };

  // Timer logic
  useEffect(() => {
    if (isLoading || timeLeft === null) return;

    if (timeLeft <= 0) {
      toast("⚠️ Time is up! Submitting your test...");
      performSubmission();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading, timeLeft]); // Only restart if loading state changes (i.e., after fetch)

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + ":" : ""}${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !attemptData || questions.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 text-lg">Failed to load attempt data or no questions found.</p>
        <button 
          onClick={() => navigate("/dashboard/pte")}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentSection = attemptData.sections.find(s => s.questions.some(q => q.id === currentQuestion.id));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-950 font-poppins">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold dark:text-white hidden md:block">
            {attemptData.attempt.mock_test.title}
          </h1>
          <div className="h-6 w-px bg-gray-300 dark:bg-slate-700 hidden md:block"></div>
          <div className="text-sm font-medium text-gray-500 dark:text-slate-400">
            Section: <span className="text-primary font-bold uppercase">{currentSection?.section_name}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={submitAnswerMutation.isPending}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm"
          >
            {submitAnswerMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} 
            <span className="hidden md:inline">Finish Test</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        {/* Question Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-sm">
              {currentQuestionIndex + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold dark:text-white uppercase tracking-wide break-words">
                {currentQuestion.task_type.replace(/_/g, ' ')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium break-words">
                {currentQuestion.title} | {currentQuestion.marks} Marks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-slate-400">
            Question <span className="font-bold text-primary">{currentQuestionIndex + 1}</span> of <span className="font-bold">{questions.length}</span>
          </div>
        </div>

        {/* Instruction Card */}
        <div className="bg-[#FFFCE5] dark:bg-amber-900/10 border border-yellow-200 dark:border-amber-900/30 p-4 rounded-xl overflow-hidden">
           <p className="text-sm md:text-base font-medium text-gray-800 dark:text-amber-200/80 leading-relaxed break-words">
             {currentQuestion.instruction}
           </p>
        </div>

        {/* Task Area */}
        <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-800 p-4 md:p-10 flex-1 min-h-[400px] overflow-hidden">
          <TaskRenderer 
            question={currentQuestion} 
            userAnswers={userAnswers}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleInputChange={handleInputChange}
            isRecording={isRecording}
            recordingDuration={recordingDuration}
            audioUrl={audioUrl}
            startRecording={startRecording}
            stopRecording={stopRecording}
            resetRecording={resetRecording}
          />
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-4 md:px-8 py-4 sticky bottom-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              currentQuestionIndex === 0 
              ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' 
              : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <ChevronLeft size={20} /> Previous
          </button>

          <div className="hidden md:flex gap-2">
            {questions.map((_, idx) => (
               <button
                 key={idx}
                 onClick={() => saveAndNavigate(idx)}
                 className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                   currentQuestionIndex === idx
                   ? 'bg-primary text-white shadow-md scale-110'
                   : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:bg-gray-200 dark:hover:bg-slate-700'
                 }`}
               >
                 {idx + 1}
               </button>
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1 || submitAnswerMutation.isPending}
            className={`flex items-center gap-2 px-10 py-3 rounded-xl font-bold transition-all ${
              currentQuestionIndex === questions.length - 1 || submitAnswerMutation.isPending
              ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
            }`}
          >
            {submitAnswerMutation.isPending ? 'Saving...' : 'Next'} <ChevronRight size={20} />
          </button>
        </div>
      </footer>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 w-full max-w-md flex flex-col items-center text-center shadow-2xl border border-gray-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-4">Test Completed!</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-8 font-medium">
              Your answers have been successfully submitted for evaluation. You can now view your result or take the test again.
            </p>
            <div className="flex flex-col w-full gap-4">
              <button
                onClick={() => navigate(`/dashboard/pte/result/${attemptId}`)}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Result
              </button>
              <button
                onClick={() => navigate(`/dashboard/pte`)}
                className="w-full py-4 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
              >
                Take the Test Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 w-full max-w-md flex flex-col items-center text-center shadow-2xl border border-gray-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">Submit Test?</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-8 font-medium">
              Are you sure you want to finish the test? You won't be able to change your answers after submission.
            </p>
            <div className="flex flex-col md:flex-row w-full gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  performSubmission();
                }}
                className="flex-1 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Task Renderer Component
const TaskRenderer = ({ 
  question, 
  userAnswers, 
  handleDragStart, 
  handleDragOver, 
  handleDrop,
  handleInputChange,
  isRecording,
  recordingDuration,
  audioUrl,
  startRecording,
  stopRecording,
  resetRecording
}) => {
  const { task_type, content, id, media_url } = question;
  const currentAnswer = userAnswers[id] || {};
  const answers = currentAnswer.answers || {};
  
  const qAudioUrl = currentAnswer.audioUrl || audioUrl;
  const qIsRecording = isRecording; 
  const qRecordingDuration = recordingDuration;

  const isImage = media_url?.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  const isAudio = media_url?.match(/\.(mp3|wav|ogg)$/i);

  switch (task_type) {
    // --- Section 1: Speaking (Audio Input) ---
    case "read_aloud":
    case "repeat_sentence":
    case "describe_image":
    case "retell_lecture":
    case "summarize_group_discussion":
    case "respond_to_situation":
    case "answer_short_question":
      return (
        <div className="space-y-8 flex flex-col items-center">
          {/* Media Section (Image or Audio for Reference) */}
          {media_url && (
            <div className="w-full max-w-2xl flex flex-col items-center gap-4">
              {isImage && (
                <div className="w-full overflow-hidden rounded-[2.5rem] border-8 border-white dark:border-slate-800 shadow-2xl">
                  <img src={media_url} alt="Task visual" className="w-full h-auto object-cover" />
                </div>
              )}
              {isAudio && (
                <div className="w-full p-10 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-[3rem] border-2 border-dashed border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center gap-6">
                   <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 animate-pulse">
                      <Volume2 size={40} />
                   </div>
                   <div className="w-full max-w-md">
                      <audio src={media_url} controls className="w-full h-12 accent-primary" />
                   </div>
                   <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Listen carefully to the recording</p>
                </div>
              )}
            </div>
          )}

          {/* Text content for Read Aloud / Transcripts */}
          {(content.text || content.transcript) && (
            <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-100 dark:border-slate-800 w-full shadow-sm">
              <p className="text-gray-700 dark:text-slate-200 text-xl md:text-3xl font-medium leading-relaxed italic text-center">
                "{content.text || content.transcript}"
              </p>
            </div>
          )}

          {/* User Recording Interface */}
          <div className="w-full max-w-xl space-y-6">
            <div className="flex flex-col items-center gap-8 p-12 bg-gray-50 dark:bg-slate-800/30 rounded-[4rem] border border-gray-200 dark:border-slate-800 shadow-inner">
              {qIsRecording ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-28 h-28 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-200 dark:shadow-none animate-pulse z-10 relative">
                      <StopCircle size={48} onClick={stopRecording} className="cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-25"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-red-600 font-black uppercase tracking-widest text-xs">Recording Active</p>
                    <p className="text-4xl font-mono font-bold text-slate-800 dark:text-white mt-2">
                      {Math.floor(qRecordingDuration / 60)}:{(qRecordingDuration % 60).toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>
              ) : qAudioUrl ? (
                <div className="flex flex-col items-center gap-8 w-full">
                  <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-200 dark:shadow-none">
                    <Play size={40} />
                  </div>
                  <div className="w-full bg-white dark:bg-slate-950 p-6 rounded-3xl flex items-center gap-6 border border-gray-100 dark:border-slate-800 shadow-sm">
                    <audio src={qAudioUrl} controls className="flex-1 h-12" />
                    <button 
                      onClick={() => resetRecording(id)}
                      className="p-4 bg-gray-50 dark:bg-slate-900 text-gray-400 hover:text-red-500 rounded-2xl transition-all hover:shadow-md"
                      title="Delete and re-record"
                    >
                      <RotateCcw size={24} />
                    </button>
                  </div>
                  <p className="text-sm font-black text-green-600 uppercase tracking-[0.3em]">Answer Captured Successfully</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <button 
                    onClick={() => startRecording(id, task_type)}
                    className="w-28 h-28 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all group"
                  >
                    <Mic size={48} className="group-hover:animate-bounce" />
                  </button>
                  <p className="text-primary font-black uppercase tracking-[0.3em] text-xs">Start Your Response</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    // --- Section 2: Writing (Text Area Input) ---
    case "summarize_written_text":
    case "write_essay":
    case "summarize_spoken_text":
    case "write_from_dictation":
      return (
        <div className="space-y-8">
          {/* Reference Content (Text or Audio) */}
          <div className="w-full">
            {media_url && isAudio ? (
              <div className="p-10 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-[3rem] border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
                   <Volume2 size={32} />
                </div>
                <audio src={media_url} controls className="w-full max-w-md h-12" />
              </div>
            ) : content.text ? (
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm mb-8">
                <p className="text-gray-700 dark:text-slate-200 text-xl font-medium leading-relaxed">
                  {content.text}
                </p>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <textarea 
              className="w-full min-h-[300px] p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:text-white text-lg shadow-sm"
              placeholder="Type your response here..."
              value={typeof currentAnswer.answers === 'string' ? currentAnswer.answers : ''}
              onChange={(e) => handleInputChange(id, task_type, e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center px-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">Character limit may apply</span>
              <div className="px-6 py-2 bg-primary/5 text-primary rounded-full text-sm font-black uppercase tracking-wider">
                Word Count: {(typeof currentAnswer.answers === 'string' ? currentAnswer.answers : '').split(/\s+/).filter(Boolean).length}
              </div>
            </div>
          </div>
        </div>
      );

    // --- Section 3: Reading (Interactive Inputs) ---
    case "fill_in_the_blanks_dropdown":
      return (
        <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-sm">
           <p className="text-gray-700 dark:text-slate-200 text-xl md:text-3xl font-medium leading-[5rem]">
             {content.text.split(/\[\d+\]/).map((part, index) => (
               <React.Fragment key={index}>
                 {part}
                 {index < content.choices.length && (
                   <select 
                    value={answers[index + 1] || ""}
                    onChange={(e) => handleInputChange(id, task_type, e.target.value, index + 1)}
                    className="mx-3 px-4 py-2 rounded-xl border-2 border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-lg focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-primary"
                   >
                      <option value="">Select...</option>
                      {content.choices[index].map((choice, cIdx) => (
                        <option key={cIdx} value={choice}>{choice}</option>
                      ))}
                   </select>
                 )}
               </React.Fragment>
             ))}
           </p>
        </div>
      );

    case "fill_in_the_blanks_drag_drop":
      const fibaAnswer = currentAnswer.blanks || {};
      const fibaBank = currentAnswer.bank || content.all_options;
      return (
        <div className="space-y-12">
          <div className="p-10 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
             <p className="text-gray-700 dark:text-slate-200 text-xl md:text-3xl font-medium leading-[5rem]">
               {content.text.split(/\[\d+\]/).map((part, index, arr) => (
                 <React.Fragment key={index}>
                   {part}
                   {index < arr.length - 1 && (
                     <span 
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, "fiba_blank", id, index)}
                        className={`mx-3 inline-block min-w-[140px] h-14 border-4 border-dashed rounded-2xl align-middle transition-all ${
                          fibaAnswer[index] 
                          ? 'border-primary bg-primary/5 text-primary text-center leading-[3.2rem] font-black'
                          : 'border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/50'
                        }`}
                      >
                        {fibaAnswer[index] && (
                          <span 
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("fromBlank", index.toString());
                              handleDragStart(e, fibaAnswer[index], "fiba_blank", id);
                            }}
                          >
                            {fibaAnswer[index]}
                          </span>
                        )}
                      </span>
                   )}
                 </React.Fragment>
               ))}
             </p>
          </div>
          <div 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "fiba_bank", id)}
            className="flex flex-wrap gap-4 justify-center p-12 bg-gray-50/50 dark:bg-slate-950/50 rounded-[4rem] border-4 border-dashed border-gray-200 dark:border-slate-800"
          >
             {fibaBank.map((option, idx) => (
               <div 
                  key={idx} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, option, "fiba_bank", id)}
                  className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl shadow-xl cursor-grab active:cursor-grabbing hover:border-primary transition-all font-black text-primary text-lg"
                >
                 {option}
               </div>
             ))}
          </div>
        </div>
      );

    case "fill_in_the_blanks_write_word":
      return (
        <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-sm">
           {media_url && isAudio && (
              <div className="flex flex-col items-center gap-4 mb-10 p-8 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-[2rem]">
                 <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                    <Volume2 size={24} />
                 </div>
                 <audio src={media_url} controls className="w-full max-w-sm" />
              </div>
           )}
           <p className="text-gray-700 dark:text-slate-200 text-xl md:text-3xl font-medium leading-[5rem]">
             {content.text.split(/\[\d+\]/).map((part, index, arr) => (
               <React.Fragment key={index}>
                 {part}
                 {index < arr.length - 1 && (
                    <input 
                      type="text" 
                      value={answers[index + 1] || ""}
                      onChange={(e) => handleInputChange(id, task_type, e.target.value, index + 1)}
                      className="mx-3 w-44 px-4 py-2 rounded-xl border-2 border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-xl font-black text-primary focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-center"
                      placeholder="..."
                    />
                 )}
               </React.Fragment>
             ))}
           </p>
        </div>
      );

    case "re_order_paragraphs":
      const reorderSource = currentAnswer.source || content.paragraphs;
      const reorderTarget = currentAnswer.target || [];
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full min-h-[500px]">
           <div 
             className="space-y-6"
             onDragOver={handleDragOver}
             onDrop={(e) => handleDrop(e, "reorder_source", id)}
           >
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3 px-4">
                <span className="w-3 h-3 bg-gray-300 rounded-full"></span> Source Paragraphs ({reorderSource.length})
              </h3>
              <div className="space-y-4 min-h-[300px] lg:min-h-[400px] p-2">
                {reorderSource.map((p, idx) => (
                  <div 
                    key={idx} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, p, "reorder_source", id, idx)}
                    className="p-4 lg:p-6 bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl border-2 border-gray-100 dark:border-slate-700 shadow-sm cursor-grab active:cursor-grabbing hover:border-primary transition-all text-sm lg:text-lg font-medium leading-relaxed break-words"
                  >
                    {p.text}
                  </div>
                ))}
              </div>
           </div>
           <div className="space-y-6 flex flex-col">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3 px-4">
                <span className="w-3 h-3 bg-primary rounded-full"></span> Final Sequence ({reorderTarget.length})
              </h3>
              <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "reorder_target", id)}
                className="flex-1 min-h-[300px] lg:min-h-[400px] bg-gray-50/50 dark:bg-slate-950/50 border-4 border-dashed border-gray-200 dark:border-slate-800 rounded-[2.5rem] lg:rounded-[3.5rem] p-4 lg:p-6 flex flex-col gap-4"
              >
                {reorderTarget.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                    <p className="text-center font-black uppercase tracking-widest text-[10px]">Drop items here</p>
                    <p className="text-center font-medium max-w-[200px] text-xs">Drag paragraphs from the left to build the correct order</p>
                  </div>
                ) : (
                  reorderTarget.map((p, idx) => (
                    <div 
                      key={idx} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, p, "reorder_target", id, idx)}
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={(e) => { e.stopPropagation(); handleDrop(e, "reorder_target", id, idx); }}
                      className="p-4 lg:p-6 bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl border-4 border-primary/10 shadow-xl cursor-grab active:cursor-grabbing hover:border-primary transition-all border-l-8 border-l-primary text-sm lg:text-lg font-medium leading-relaxed break-words"
                    >
                      {p.text}
                    </div>
                  ))
                )}
              </div>
           </div>
        </div>
      );

    // --- Section 4: Selection Tasks (MCQ, Summary, Missing Word) ---
    case "multiple_choice_multiple_answer_reading":
    case "multiple_choice_single_answer_reading":
    case "multiple_choice_multiple_answer_listening":
    case "multiple_choice_single_answer_listening":
    case "highlight_correct_summary":
    case "select_missing_word":
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Reference Side */}
          <div className="w-full overflow-hidden">
            {media_url && isAudio ? (
              <div className="p-6 lg:p-10 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-[2.5rem] lg:rounded-[3rem] border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center gap-6">
                 <div className="w-12 h-12 lg:w-16 lg:h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg">
                    <Volume2 size={28} />
                 </div>
                 <audio src={media_url} controls className="w-full max-w-sm h-12" />
                 <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Listening task reference</p>
              </div>
            ) : content.text ? (
              <div className="p-6 lg:p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] lg:rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-sm max-h-[400px] lg:max-h-[500px] overflow-y-auto scrollbar-thin prose dark:prose-invert prose-p:text-base max-w-none">
                 <div 
                   className="text-gray-700 dark:text-slate-200 text-base leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: content.text }}
                 />
              </div>
            ) : (
              <div className="p-10 bg-gray-50 dark:bg-slate-800/30 rounded-[2.5rem] lg:rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[250px] lg:min-h-[300px]">
                 <Volume2 size={40} className="text-gray-300 mb-4" />
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] text-center">Audio/Text reference required</p>
              </div>
            )}
          </div>

          {/* Question Side */}
          <div className="space-y-6 lg:space-y-8 w-full overflow-hidden">
             <div className="p-6 lg:p-8 bg-primary/5 rounded-2xl lg:rounded-[2.5rem] border border-primary/10">
                <h3 className="text-base lg:text-lg font-black text-slate-800 dark:text-white leading-snug break-words">
                  {content.question || "Select the most appropriate option(s) based on the context."}
                </h3>
             </div>
             <div className="space-y-3 lg:space-y-4">
                {content.options.map((option, idx) => {
                  const isSelected = task_type.includes('multiple_answer') 
                    ? (Array.isArray(answers) && answers.includes(idx)) 
                    : answers === idx;
                  return (
                    <label 
                      key={idx}
                      className={`flex items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-2xl lg:rounded-3xl border-2 transition-all group cursor-pointer ${
                        isSelected
                        ? 'border-primary bg-primary/5 shadow-lg scale-[1.01] lg:scale-[1.02]'
                        : 'border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:border-primary/30'
                      }`}
                    >
                       <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                         isSelected ? 'bg-primary border-primary' : 'border-gray-200 dark:border-slate-700'
                       }`}>
                          <input 
                            type={task_type.includes('multiple_answer') ? 'checkbox' : 'radio'} 
                            checked={isSelected}
                            onChange={() => handleInputChange(id, task_type, idx)}
                            className="hidden"
                          />
                          {isSelected && <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white rounded-sm"></div>}
                       </div>
                       <span className={`text-sm lg:text-base font-bold transition-colors break-words ${isSelected ? 'text-primary' : 'text-gray-700 dark:text-slate-300'}`}>
                         {option}
                       </span>
                    </label>
                  );
                })}
             </div>
          </div>
        </div>
      );

    case "highlight_incorrect_words":
      return (
        <div className="space-y-8">
           <div className="p-8 lg:p-10 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-[2.5rem] lg:rounded-[3rem] border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center gap-6">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg">
                 <Volume2 size={28} />
              </div>
              <audio src={media_url} controls className="w-full max-w-sm h-12" />
              <p className="text-[10px] lg:text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-center">Click on words that differ from the recording</p>
           </div>
           <div className="p-6 lg:p-12 bg-white dark:bg-slate-900 rounded-[2.5rem] lg:rounded-[4rem] border border-gray-100 dark:border-slate-800 shadow-inner overflow-hidden">
              <div className="flex flex-wrap gap-x-2 lg:gap-x-3 gap-y-4 lg:gap-y-6 leading-relaxed lg:leading-[3.5rem]">
                {content.tokens.map((token, idx) => {
                  const isHighlighted = (Array.isArray(answers) && answers.includes(idx));
                  return (
                    <span 
                      key={idx}
                      onClick={() => handleInputChange(id, task_type, idx)}
                      className={`px-2 lg:px-3 py-1 rounded-lg lg:rounded-xl cursor-pointer transition-all text-base lg:text-2xl font-bold break-words ${
                        isHighlighted
                        ? 'bg-red-500 text-white shadow-lg -translate-y-1'
                        : 'text-gray-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {token}
                    </span>
                  );
                })}
              </div>
           </div>
        </div>
      );

    default:
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-20 bg-gray-50/50 dark:bg-slate-900/50 rounded-[4rem] border-4 border-dashed border-gray-100 dark:border-slate-800">
          <div className="w-24 h-24 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8">
            <File size={48} className="text-gray-400" />
          </div>
          <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-tighter">Task: {task_type.replace(/_/g, ' ')}</h3>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-md font-medium">
            This module is currently being finalized. Please check back shortly for the updated interface.
          </p>
        </div>
      );
  }
};

export default PteTestAttempt;
