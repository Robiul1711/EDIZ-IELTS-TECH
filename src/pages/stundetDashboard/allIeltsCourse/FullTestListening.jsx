import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import TestHeader from "@/components/common/TestHeader";
import FillGap from "@/components/studentDashboard/readingQuestions/FillGap";
import FillGapOptions from "@/components/studentDashboard/readingQuestions/FillGapOptions";
import MCQ from "@/components/studentDashboard/readingQuestions/MCQ";
import MultipleChoiceGroup from "@/components/studentDashboard/readingQuestions/MultipleChoiceGroup";
import Matching from "@/components/studentDashboard/readingQuestions/Matching";
import TFNG from "@/components/studentDashboard/readingQuestions/TFNG";
import { toast } from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Volume2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ListFilter,
  FileText,
} from "lucide-react";

const FullTestListening = ({ data, session, onComplete }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookNo = searchParams.get("book_no") || searchParams.get("book");
  const type = searchParams.get("type") || "academic";

  const {
    mutate: submitTest,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useApiMutation({
    url: "/ielts/full-test/submit-section",
    method: "POST",
    secure: true,
    onSuccess: () => {
      onComplete();
    },
  });

  const [startTime] = useState(Date.now());
  const [answers, setAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const [activePart, setActivePart] = useState(0);




  const testParts = data || [];
  const testPart = testParts[activePart] || {};
  const questionGroups = testPart?.questions || [];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const formData = new FormData();
    formData.append("session_id", session.id);
    formData.append("skill", "listening");
    formData.append("time_spent", timeSpent);

    Object.entries(answers).forEach(([index, value]) => {
      formData.append(`answer[${index}]`, value);
    });

    submitTest(formData);
  };

  const renderQuestionGroup = (group, idx) => {
    return (
      <div
        key={idx}
        className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="px-5 py-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 dark:border-indigo-800/50">
            {group.type?.replace("_", " ") || "Question"}
          </div>
        </div>

        {(() => {
          switch (group.type) {
            case "tfng":
              return (
                <TFNG
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            case "choice":
              return (
                <MCQ
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            case "multiple_choice_group":
              return (
                <MultipleChoiceGroup
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            case "fill_gap":
              return (
                <FillGap
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            case "fill_gap_options":
              return (
                <FillGapOptions
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            case "matching":
              return (
                <Matching
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            default:
              return (
                <div className="p-10 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <FileText size={20} />
                  </div>
                  <p className="text-slate-500 font-bold text-sm tracking-tight">
                    Question type not supported: {group.type}
                  </p>
                </div>
              );
          }
        })()}
      </div>
    );
  };



  return (
    <div className="flex flex-col flex-1 overflow-hidden font-sans">

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Side: Audio Player & Transcript */}
        <div className="md:w-1/3 h-full overflow-y-auto p-6 lg:p-10 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 custom-scrollbar shadow-xl z-20">
          <div className="max-w-xl mx-auto space-y-10 pb-10">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase">
                <Volume2 size={12} />
                Part {testPart?.part_no || activePart + 1} Listening
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {testPart?.title || "Listening Component"}
              </h1>
            </header>

            {/* Audio Area */}
            <div className="p-8 bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    Audio Track
                  </span>
                  <span className="text-xs font-mono text-white/50">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={() =>
                      audioRef.current && (audioRef.current.currentTime -= 10)
                    }
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <RotateCcw size={22} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white text-slate-900 rounded-[1.8rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    {isPlaying ? (
                      <Pause size={30} fill="currentColor" />
                    ) : (
                      <Play size={30} fill="currentColor" className="ml-1" />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      audioRef.current && (audioRef.current.currentTime += 10)
                    }
                    className="text-white/40 hover:text-white transition-colors rotate-180"
                  >
                    <RotateCcw size={22} />
                  </button>
                </div>
              </div>

              <audio
                ref={audioRef}
                src={testPart?.audio_url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
            </div>

            {/* Part Details / Transcript */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900/30 rounded-[2rem] border border-slate-100 dark:border-slate-800">
              <div
                className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm font-medium italic"
                dangerouslySetInnerHTML={{ __html: testPart?.part_details }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Questions */}
        <div className="flex-1 h-full overflow-y-auto p-6 lg:p-12 bg-slate-50 dark:bg-slate-950 custom-scrollbar pb-40">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* General Prompt / Transcript HTML if needed */}
            {testPart?.prompt && (
              <div
                className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-lg bg-white dark:bg-slate-900 p-10 lg:p-16 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 mb-10"
                dangerouslySetInnerHTML={{ __html: testPart?.prompt }}
              />
            )}

            {/* Structured Question Groups mapping */}
            <div className="space-y-10">
              {questionGroups.map((group, idx) =>
                renderQuestionGroup(group, idx),
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
                setIsPlaying(false);
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
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
          disabled={isSubmitting || isSubmitted}
          className="group relative flex items-center gap-4 px-10 h-14 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-indigo-100 dark:shadow-none uppercase text-[10px] tracking-[0.2em]"
        >
          <span>
            {isSubmitting
              ? "Submitting..."
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

export default FullTestListening;
