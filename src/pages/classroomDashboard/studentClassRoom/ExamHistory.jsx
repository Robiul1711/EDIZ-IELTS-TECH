import React from "react";

const ExamHistory = () => {
  return (
    <div className="min-h-screen bg-[#09090b] p-4 md:p-8 rounded-2xl space-y-10 text-zinc-100">
      {/* ================= Recent ================= */}
      <Section title="Recent">
        <Table>
          <Row
            sl="1"
            exam="IELTS Listening-G"
            mark="40"
            started="02 Dec 2025, 14:02"
            ended="02 Dec 2025, 14:02"
          />
        </Table>
      </Section>

      {/* ================= Previous ================= */}
      <Section title="Previous Exam">
        <Table>
          <Row
            sl="1"
            exam="IELTS Listening-A"
            mark="40"
            started="02 Dec 2025, 14:02"
            ended="02 Dec 2025, 14:02"
          />
          <Row
            sl="2"
            exam="IELTS Listening-G"
            mark="40"
            started="02 Dec 2025, 14:02"
            ended="02 Dec 2025, 14:02"
          />
        </Table>
      </Section>
    </div>
  );
};

export default ExamHistory;

/* ---------------- Sub-Components ---------------- */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-medium text-zinc-400 mb-4 ml-1">
      {title}
    </h2>
    <div className="bg-[#121214] rounded-2xl border border-zinc-800 p-1 md:p-4 shadow-2xl">
      {children}
    </div>
  </div>
);

const Table = ({ children }) => (
  <div className="overflow-x-auto custom-scrollbar">
    <div className="min-w-[1000px] p-4">
      {/* Header */}
      <div className="grid grid-cols-[60px_200px_80px_1fr_140px_100px_160px] text-sm font-semibold text-zinc-500 border-b border-zinc-800 pb-4 mb-6">
        <span>SL</span>
        <span>Exam Name</span>
        <span>Mark</span>
        <span>Exam date & time</span>
        <span>Attendance</span>
        <span>Result</span>
        <span>Actions</span>
      </div>

      {/* Rows */}
      <div className="space-y-4">{children}</div>
    </div>
  </div>
);

const Row = ({ sl, exam, mark, started, ended }) => (
  <div className="grid grid-cols-[60px_200px_80px_1fr_140px_100px_160px] items-center text-sm text-zinc-300 hover:bg-zinc-800/50 p-2 rounded-xl transition-colors">
    <span className="text-zinc-500 font-mono">{sl}</span>

    <span className="font-semibold text-zinc-100">{exam}</span>

    <span>{mark}</span>

    <div className="text-xs space-y-1">
      <p className="text-zinc-400">
        Started: <span className="text-zinc-500">{started}</span>
      </p>
      <p className="text-zinc-400">
        Ended: <span className="text-zinc-500">{ended}</span>
      </p>
    </div>

    <div>
      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
        Present
      </span>
    </div>

    <div>
      <span className="px-3 py-1 rounded-md bg-zinc-800 text-zinc-100 text-xs font-mono border border-zinc-700">
        32
      </span>
    </div>

    <button
      className="h-9 px-4 rounded-lg bg-[#5b4cf0] text-white text-sm font-medium
                 hover:bg-[#4a3ce0] active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
    >
      Retake exam
    </button>
  </div>
);