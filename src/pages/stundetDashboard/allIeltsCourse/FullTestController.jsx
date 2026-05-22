import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import TestHeader from "@/components/common/TestHeader";
import { useApiMutation } from "@/hooks/apiMutation";

import FullTestListening from "./FullTestListening";
import FullTestReading from "./FullTestReading";
import FullTestWriting from "./FullTestWriting";
import FullTestSpeaking from "./FullTestSpeaking";

const SKILL_ORDER = ["listening", "reading", "writing", "speaking"];

const FullTestController = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "academic";
  const navigate = useNavigate();

  const {
    mutate: startTest,
    data: fullTestData,
    isPending: isLoading,
  } = useApiMutation({
    url: () => `/ielts/full-test/start?type=${type}`,
    method: "POST",
    secure: true,
    toast: false,
  });

  const [currentSkill, setCurrentSkill] = useState(null);
  const [showTransition, setShowTransition] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Start the test on mount (once)
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      startTest({});
    }
  }, [hasStarted, startTest]);

  // Once we have data, determine the first pending skill from skill statuses
  useEffect(() => {
    if (fullTestData?.data && !currentSkill) {
      const data = fullTestData.data;
      // Find first skill whose status is not_started or pending
      const firstSkill = SKILL_ORDER.find((s) => {
        const status = data[s]?.status;
        return status === "not_started" || status === "pending";
      });
      setCurrentSkill(firstSkill || "listening");
    }
  }, [fullTestData, currentSkill]);

  // ─── Loading state ───────────────────────────────────────────────────────────
  if (isLoading || (!fullTestData && hasStarted)) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest animate-pulse">
            Loading Full Test Session...
          </p>
        </div>
      </div>
    );
  }

  const session = fullTestData?.data?.session;

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
        <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Failed to Start Test
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Could not retrieve full test session data. Please try again.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleSectionComplete = () => {
    const currentIndex = SKILL_ORDER.indexOf(currentSkill);
    if (currentIndex < SKILL_ORDER.length - 1) {
      setShowTransition(true);
    } else {
      // All sections done → go to result page
      navigate(`/dashboard/ielts/full-test/result?session_id=${session.id}`);
    }
  };

  const handleContinue = () => {
    const currentIndex = SKILL_ORDER.indexOf(currentSkill);
    setCurrentSkill(SKILL_ORDER[currentIndex + 1]);
    setShowTransition(false);
  };

  // The API response wraps data inside { test: [...], status: "..." }
  // Pass only the test array to child components
  const skillTestData = fullTestData?.data?.[currentSkill]?.test || [];
  const nextSkill = SKILL_ORDER[SKILL_ORDER.indexOf(currentSkill) + 1];

  // ─── Transition screen ────────────────────────────────────────────────────────
  if (showTransition) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 font-sans">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-16 max-w-lg w-full mx-4 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center mx-auto text-4xl">
            ✅
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white capitalize">
            {currentSkill} Complete!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Get ready for the{" "}
            <span className="font-bold text-indigo-600 dark:text-indigo-400 capitalize">
              {nextSkill}
            </span>{" "}
            section.
          </p>
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-xl shadow-indigo-200 dark:shadow-none uppercase tracking-widest text-sm"
          >
            Continue to {nextSkill} →
          </button>
        </div>
      </div>
    );
  }

  // ─── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 overflow-hidden">
      <TestHeader durationInSeconds={3600} onExit="/dashboard/ielts" />

      <div className="flex-1 overflow-hidden flex flex-col">
        {currentSkill === "listening" && (
          <FullTestListening
            data={skillTestData}
            session={session}
            onComplete={handleSectionComplete}
          />
        )}
        {currentSkill === "reading" && (
          <FullTestReading
            data={skillTestData}
            session={session}
            onComplete={handleSectionComplete}
          />
        )}
        {currentSkill === "writing" && (
          <FullTestWriting
            data={skillTestData}
            session={session}
            onComplete={handleSectionComplete}
          />
        )}
        {currentSkill === "speaking" && (
          <FullTestSpeaking
            data={skillTestData}
            session={session}
            onComplete={handleSectionComplete}
          />
        )}
        {!currentSkill && (
          <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FullTestController;
