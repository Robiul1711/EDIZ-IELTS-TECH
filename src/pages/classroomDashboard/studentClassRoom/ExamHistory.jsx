const ExamHistory = () => {
  return (
    <div className="min-h-screen bg-[#f7f6ff] p-4 rounded-2xl space-y-10">
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

/* ---------------- Components ---------------- */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-medium text-gray-600 mb-4">
      {title}
    </h2>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      {children}
    </div>
  </div>
);

const Table = ({ children }) => (
  <div>
    {/* Header */}
    <div className="grid grid-cols-[60px_200px_80px_1fr_140px_100px_160px] text-sm font-semibold text-gray-700 mb-4">
      <span>SL</span>
      <span>Exam Name</span>
      <span>Mark</span>
      <span>Exam date & time</span>
      <span>Attendance</span>
      <span>Result</span>
      <span>Actions</span>
    </div>

    {/* Rows */}
    <div className="space-y-6">{children}</div>
  </div>
);

const Row = ({ sl, exam, mark, started, ended }) => (
  <div className="grid grid-cols-[60px_200px_80px_1fr_140px_100px_160px] items-center text-sm text-gray-800">
    <span>{sl}</span>

    <span className="font-medium">{exam}</span>

    <span>{mark}</span>

    <div className="text-sm text-gray-600 space-y-1">
      <p>
        Exam started:{" "}
        <span className="text-gray-400">{started}</span>
      </p>
      <p>
        Exam Ended:{" "}
        <span className="text-gray-400">{ended}</span>
      </p>
    </div>

    <span>
      <span className="px-4 py-1 rounded-md bg-green-500 text-white text-xs font-medium">
        Present
      </span>
    </span>

    <span>
      <span className="px-3 py-1 rounded-md bg-[#1f2937] text-white text-xs">
        32
      </span>
    </span>

    <button
      className="h-9 px-4 rounded-lg bg-[#5b4cf0] text-white text-sm font-medium
                 hover:opacity-90 transition"
    >
      Retake exam
    </button>
  </div>
);
