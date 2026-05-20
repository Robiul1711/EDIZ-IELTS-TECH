import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { File, Mic, Clock, ChevronLeft, ChevronRight, Send, Loader2, StopCircle, RotateCcw, Play, Volume2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const StartPteExam = () => {
  const { id } = useParams();
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

  const { data: examData, isLoading, isError } = useQuery({
    queryKey: ["student-pte-exam", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/student/pte-exam/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  // Derived questions
  const questions = useMemo(() => {
    return examData?.questions || [];
  }, [examData]);

  // Sync timeLeft with fetched data once
  useEffect(() => {
    if (examData && (timeLeft === 0 || timeLeft === null)) {
      const totalTime = examData.time; // In minutes
      if (totalTime !== undefined && totalTime !== null) {
        setTimeLeft(Number(totalTime) * 60);
      }
    }
  }, [examData, timeLeft]);

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
  }, [questions]);

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

      if (audio) {
        payload = new FormData();
        payload.append("question_id", questionId);
        payload.append("time_taken", timeTaken);
        payload.append("audio", audio, `answer_${questionId}.webm`);
      } else {
        payload = {
          question_id: questionId,
          answers: answers,
          time_taken: timeTaken,
        };
      }

      const response = await axiosSecure.post(`/student/pte-exam/${id}/submit`, payload);
      return response.data;
    },
    onError: (error) => {
      console.error("Error submitting answer:", error);
      toast.error("Failed to save answer progress.");
    }
  });

  const completeTestMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.post(`/student/pte-exam/${id}/complete`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Exam completed and submitted successfully!");
      navigate("/classroom/register-as-student");
    },
    onError: (error) => {
      console.error("Error completing exam:", error);
      toast.error("Failed to complete exam.");
    }
  });

  const getFormattedAnswer = (questionId) => {
    const userAns = userAnswers[questionId];
    const question = questions.find(q => q.id === questionId);
    if (!userAns || !question) return null;

    const { task_type, target, blanks, answers } = userAns;

    if (task_type === "re_order_paragraphs") {
      return target.map(p => {
        if (p.id !== undefined && p.id !== null) {
          return Number(p.id);
        }
        return question.content.paragraphs.findIndex(orig => orig.text === p.text);
      });
    }

    if (task_type === "fill_in_the_blanks_drag_drop") {
      const formattedBlanks = {};
      for (const key in blanks) {
        formattedBlanks[String(Number(key))] = blanks[key];
      }
      return formattedBlanks;
    }

    if (task_type === "fill_in_the_blanks_dropdown" || task_type === "fill_in_the_blanks_write_word") {
      const formattedAnswers = {};
      const rawAnswers = answers || {};
      Object.keys(rawAnswers).forEach((key) => {
        const zeroBasedKey = String(Number(key) - 1);
        formattedAnswers[zeroBasedKey] = rawAnswers[key];
      });
      return formattedAnswers;
    }

    if (
      task_type === "multiple_choice_single_answer_reading" ||
      task_type === "multiple_choice_single_answer_listening" ||
      task_type === "highlight_correct_summary" ||
      task_type === "select_missing_word"
    ) {
      if (answers !== undefined && answers !== null && question.content?.options) {
        const selectedIdx = Number(answers);
        if (task_type === "select_missing_word") {
          return question.content.options[selectedIdx] || "";
        } else {
          const letters = ["A", "B", "C", "D", "E", "F", "G"];
          return letters[selectedIdx] || "";
        }
      }
      return answers !== undefined ? String(answers) : "";
    }

    if (
      task_type === "multiple_choice_multiple_answer_reading" ||
      task_type === "multiple_choice_multiple_answer_listening"
    ) {
      if (Array.isArray(answers) && question.content?.options) {
        const letters = ["A", "B", "C", "D", "E", "F", "G"];
        return answers.map(idx => letters[Number(idx)] || "");
      }
      return Array.isArray(answers) ? answers : [];
    }

    if (task_type === "highlight_incorrect_words") {
      if (Array.isArray(answers) && question.content?.tokens) {
        return answers.map(idx => {
          const rawWord = question.content.tokens[Number(idx)] || "";
          return rawWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
        });
      }
      return Array.isArray(answers) ? answers : [];
    }

    return answers !== undefined ? answers : "";
  };

  const saveAndNavigate = async (nextIndex) => {
    if (nextIndex < currentQuestionIndex) return;
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
    // Disabled going back to previous questions
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
    } catch (error) {
      setHasSubmitted(false);
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
  }, [isLoading, timeLeft]);

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

  if (isError || !examData || questions.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 text-lg">Failed to load exam data or no questions found.</p>
        <button 
          onClick={() => navigate("/classroom/register-as-student")}
          className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-950 font-poppins">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold dark:text-white hidden md:block">
            {examData.title}
          </h1>
          <div className="h-6 w-px bg-gray-300 dark:bg-slate-700 hidden md:block"></div>
          <div className="text-sm font-medium text-gray-500 dark:text-slate-400">
            Instructor: <span className="text-primary font-bold uppercase">{examData.instructor}</span>
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
            <span className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-sm">
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
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={true}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-250 dark:border-slate-800 text-gray-400 font-bold transition-all opacity-50 cursor-not-allowed flex-shrink-0"
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Pagination Indicators - wrap to multiple lines automatically if long */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-[55%] lg:max-w-[65%]">
            {questions.map((q, idx) => {
              const isActive = idx === currentQuestionIndex;
              const isPast = idx < currentQuestionIndex;

              return (
                <button
                  key={idx}
                  disabled={isPast || idx > currentQuestionIndex}
                  onClick={() => saveAndNavigate(idx)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${
                    isActive
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20"
                      : isPast
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60"
                      : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 hover:border-primary/50"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitAnswerMutation.isPending}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold transition-all shadow-md flex-shrink-0"
            >
              <span>Submit</span>
              {submitAnswerMutation.isPending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={submitAnswerMutation.isPending}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 disabled:bg-gray-400 font-bold transition-all shadow-lg shadow-primary/25 flex-shrink-0"
            >
              <span>Next</span>
              {submitAnswerMutation.isPending ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={20} />}
            </button>
          )}
        </div>
      </footer>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 max-w-md w-full text-center border border-gray-150 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="w-20 h-20 bg-green-50 dark:bg-green-950/30 text-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <svg className="w-10 h-10 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Exam Successfully Completed</h3>
            <p className="text-gray-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
              Your exam has been submitted successfully. The scoring engine is now processing your details. You will be redirected back to the classroom page.
            </p>
            <button
              onClick={() => navigate("/classroom/register-as-student")}
              className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.99]"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 max-w-md w-full text-center border border-gray-150 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/30 text-amber-500 rounded-3xl flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Submit Exam?</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm font-medium leading-relaxed mt-2">
                Are you sure you want to finish and submit your exam attempt? This action is permanent and cannot be undone.
              </p>
            </div>
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
                className="flex-1 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
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

// Play-once Audio Player for Test Questions
const QuestionAudioPlayer = ({ src, keyId }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setHasPlayed(false);
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [src, keyId]);

  const handlePlayPause = () => {
    if (hasPlayed) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasPlayed(true);
    setCurrentTime(duration);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-5 shadow-md flex flex-col items-center gap-3">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
      
      <div className="flex items-center justify-between w-full">
        {/* Play Button */}
        <button
          type="button"
          onClick={handlePlayPause}
          disabled={hasPlayed}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            hasPlayed
              ? "bg-gray-100 dark:bg-slate-800 text-gray-400 cursor-not-allowed"
              : isPlaying
              ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-none"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:scale-105 active:scale-95"
          }`}
        >
          {hasPlayed ? (
            <Volume2 size={20} className="opacity-50" />
          ) : isPlaying ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Time and Status */}
        <div className="flex flex-col flex-1 ml-4 gap-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <span>
              {hasPlayed ? "Completed" : isPlaying ? "Playing" : "Ready to play"}
            </span>
            <span className="tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ${
                hasPlayed ? "bg-green-500" : "bg-indigo-600"
              }`}
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
      
      {hasPlayed && (
        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">
          ⚠️ Played once. This audio cannot be replayed.
        </span>
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
                <div className="w-full p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl border-2 border-dashed border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center gap-4">
                   <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                      <Volume2 size={24} />
                   </div>
                   <QuestionAudioPlayer src={media_url} keyId={id} />
                   <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Listen carefully to the recording</p>
                </div>
              )}
            </div>
          )}

          {/* Text content for Read Aloud / Transcripts */}
          {(content.text || content.transcript) && (
            <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 w-full shadow-sm">
              <p className="text-gray-700 dark:text-slate-200 text-base md:text-lg font-normal leading-relaxed italic text-center">
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
                    <p className="text-red-600 font-bold uppercase tracking-widest text-xs">Recording Active</p>
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
                  <p className="text-sm font-bold text-green-600 uppercase tracking-widest">Answer Captured Successfully</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <button 
                    onClick={() => startRecording(id, task_type)}
                    className="w-28 h-28 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all group"
                  >
                    <Mic size={48} className="group-hover:animate-bounce" />
                  </button>
                  <p className="text-primary font-bold uppercase tracking-widest text-xs">Start Your Response</p>
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
              <div className="p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md">
                   <Volume2 size={24} />
                </div>
                <QuestionAudioPlayer src={media_url} keyId={id} />
              </div>
            ) : content.text ? (
              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm mb-6">
                <p className="text-gray-700 dark:text-slate-200 text-sm md:text-base font-normal leading-relaxed">
                  {content.text}
                </p>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <textarea 
              className="w-full min-h-[250px] p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:text-white text-base shadow-sm"
              placeholder="Type your response here..."
              value={typeof currentAnswer.answers === 'string' ? currentAnswer.answers : ''}
              onChange={(e) => handleInputChange(id, task_type, e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center px-4">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest italic">Character limit may apply</span>
              <div className="px-4 py-1.5 bg-primary/5 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                Word Count: {(typeof currentAnswer.answers === 'string' ? currentAnswer.answers : '').split(/\s+/).filter(Boolean).length}
              </div>
            </div>
          </div>
        </div>
      );

    // --- Section 3: Reading (Interactive Inputs) ---
    case "fill_in_the_blanks_dropdown":
      return (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm">
           <p className="text-gray-700 dark:text-slate-200 text-sm md:text-base font-normal leading-[3rem]">
             {content.text.split(/\[\d+\]/).map((part, index) => (
               <React.Fragment key={index}>
                 {part}
                 {index < content.choices.length && (
                   <select 
                    value={answers[index + 1] || ""}
                    onChange={(e) => handleInputChange(id, task_type, e.target.value, index + 1)}
                    className="mx-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-primary"
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
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm">
             <p className="text-gray-700 dark:text-slate-200 text-sm md:text-base font-normal leading-[3rem]">
               {content.text.split(/\[\d+\]/).map((part, index, arr) => (
                 <React.Fragment key={index}>
                   {part}
                   {index < arr.length - 1 && (
                      <span 
                         onDragOver={handleDragOver}
                         onDrop={(e) => handleDrop(e, "fiba_blank", id, index)}
                         className={`mx-2 inline-block min-w-[110px] h-9 border-2 border-dashed rounded-xl align-middle transition-all ${
                           fibaAnswer[index] 
                           ? 'border-primary bg-primary/5 text-primary text-center leading-[2rem] font-medium text-sm'
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
            className="flex flex-wrap gap-3 justify-center p-6 bg-gray-50/50 dark:bg-slate-950/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800"
          >
             {fibaBank.map((option, idx) => (
               <div 
                  key={idx} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, option, "fiba_bank", id)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md cursor-grab active:cursor-grabbing hover:border-primary transition-all font-medium text-primary text-sm"
                >
                  {option}
                </div>
             ))}
          </div>
        </div>
      );

    case "fill_in_the_blanks_write_word":
      return (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm">
           {media_url && isAudio && (
              <div className="flex flex-col items-center gap-4 mb-6 p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl">
                 <QuestionAudioPlayer src={media_url} keyId={id} />
              </div>
           )}
           <p className="text-gray-700 dark:text-slate-200 text-sm md:text-base font-normal leading-[3rem]">
             {content.text.split(/\[\d+\]/).map((part, index, arr) => (
               <React.Fragment key={index}>
                 {part}
                 {index < arr.length - 1 && (
                      <input 
                        type="text" 
                        value={answers[index + 1] || ""}
                        onChange={(e) => handleInputChange(id, task_type, e.target.value, index + 1)}
                        className="mx-2 w-32 px-3 py-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-sm font-medium text-primary focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all text-center"
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
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3 px-4">
                <span className="w-3 h-3 bg-gray-300 rounded-full"></span> Source Paragraphs ({reorderSource.length})
              </h3>
              <div className="space-y-4 min-h-[300px] lg:min-h-[400px] p-2">
                {reorderSource.map((p, idx) => (
                  <div 
                    key={idx} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, p, "reorder_source", id, idx)}
                    className="p-3 lg:p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm cursor-grab active:cursor-grabbing hover:border-primary transition-all text-xs lg:text-sm font-normal leading-relaxed break-words"
                  >
                    {p.text}
                  </div>
                ))}
              </div>
           </div>
           <div className="space-y-6 flex flex-col">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-3 px-4">
                <span className="w-3 h-3 bg-primary rounded-full"></span> Final Sequence ({reorderTarget.length})
              </h3>
              <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "reorder_target", id)}
                className="flex-1 min-h-[300px] lg:min-h-[400px] bg-gray-50/50 dark:bg-slate-950/50 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-3xl p-3 lg:p-4 flex flex-col gap-4"
              >
                {reorderTarget.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                    <p className="text-center font-bold uppercase tracking-widest text-[10px]">Drop items here</p>
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
                      className="p-3 lg:p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md cursor-grab active:cursor-grabbing hover:border-primary transition-all border-l-4 border-l-primary text-xs lg:text-sm font-normal leading-relaxed break-words"
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
              <div className="p-6 lg:p-8 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center gap-4">
                 <QuestionAudioPlayer src={media_url} keyId={id} />
                 <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Listening task reference</p>
              </div>
            ) : content.text ? (
              <div className="p-6 lg:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-sm max-h-[400px] lg:max-h-[500px] overflow-y-auto scrollbar-thin prose dark:prose-invert prose-p:text-sm max-w-none">
                 <div 
                   className="text-gray-700 dark:text-slate-200 text-sm leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: content.text }}
                 />
              </div>
            ) : (
              <div className="p-8 bg-gray-50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[250px] lg:min-h-[300px]">
                 <Volume2 size={36} className="text-gray-300 mb-4" />
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] text-center">Audio/Text reference required</p>
              </div>
            )}
          </div>

          {/* Question Side */}
          <div className="space-y-6 lg:space-y-8 w-full overflow-hidden">
             <div className="p-4 lg:p-5 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="text-sm lg:text-base font-medium text-slate-800 dark:text-white leading-snug break-words">
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
                      className={`flex items-center gap-4 lg:gap-6 p-3 lg:p-4.5 rounded-xl border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:border-primary/30 transition-all group cursor-pointer ${
                        isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-100 dark:border-slate-800'
                      }`}
                    >
                       <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                         isSelected ? 'bg-primary border-primary' : 'border-gray-200 dark:border-slate-700'
                       }`}>
                          <input 
                            type={task_type.includes('multiple_answer') ? 'checkbox' : 'radio'} 
                            checked={isSelected}
                            onChange={() => handleInputChange(id, task_type, idx)}
                            className="hidden"
                          />
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>}
                       </div>
                       <span className={`text-xs lg:text-sm font-normal transition-colors break-words ${isSelected ? 'text-primary' : 'text-gray-700 dark:text-slate-300'}`}>
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
           <div className="p-6 lg:p-8 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center gap-4">
              <QuestionAudioPlayer src={media_url} keyId={id} />
              <p className="text-[10px] lg:text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-center">Click on words that differ from the recording</p>
           </div>
           <div className="p-5 lg:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-inner overflow-hidden">
              <div className="flex flex-wrap gap-x-2 lg:gap-x-3 gap-y-4 lg:gap-y-6 leading-relaxed lg:leading-[3.5rem]">
                {content.tokens.map((token, idx) => {
                  const isHighlighted = (Array.isArray(answers) && answers.includes(idx));
                  return (
                    <span 
                      key={idx}
                      onClick={() => handleInputChange(id, task_type, idx)}
                      className={`px-2 lg:px-3 py-1 rounded-lg lg:rounded-xl cursor-pointer transition-all text-sm lg:text-base font-normal break-words ${
                        isHighlighted
                        ? 'bg-red-500 text-white shadow-lg -translate-y-0.5'
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

export default StartPteExam;
