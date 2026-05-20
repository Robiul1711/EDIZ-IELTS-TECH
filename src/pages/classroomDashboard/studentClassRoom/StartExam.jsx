import React, { useState, useEffect } from "react";
import { ChevronLeft, Clock, Send, FileText, Info } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";

const StartExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());

  const { data: examData, isLoading } = useApiQuery({
    queryKey: ["student_exam_details", id],
    url: `/student/exam/${id}`,
    secure: true,
  });

  const { mutate: submitExam, isPending: isSubmitting } = useApiMutation({
    url: `/student/exam/${id}/submit`,
    method: "POST",
    secure: true,
    successMessage: "Exam submitted successfully!",
    onSuccess: () => {
      navigate("/classroom/register-as-student");
    },
  });

  useEffect(() => {
    if (examData?.data?.time) {
      setTimeLeft(examData.data.time * 60);
    }
  }, [examData]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && examData?.data) {
        // Auto submit if time runs out? 
        // For now just leave it.
    }
  }, [timeLeft, examData]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerChange = (serial, value) => {
    setAnswers((prev) => ({ ...prev, [serial]: value }));
  };

  const handleSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Prepare form data
    const formData = new FormData();
    formData.append("time_spent", timeSpent);
    
    Object.keys(answers).forEach((serial) => {
      formData.append(`answer[${serial}]`, answers[serial]);
    });

    submitExam(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const exam = examData?.data;

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/classroom/register-as-student"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft size={24} className="text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-800 dark:text-white uppercase">
                {exam?.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded uppercase">
                  {exam?.test_type} {exam?.skill}
                </span>
                <span>Book {exam?.book_no} | Test {exam?.test_no} | Part {exam?.part_no}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl border border-red-100 dark:border-red-900/30">
              <Clock size={20} className="text-red-500 animate-pulse" />
              <span className="text-xl font-mono font-bold text-red-500">
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50"
            >
              <Send size={18} />
              <span>{isSubmitting ? "Submitting..." : "Submit Exam"}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {exam?.questions?.map((block, bIdx) => (
          <div key={bIdx} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div className="p-8 border-b border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-400">
                <FileText size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Questions {block.question_range}</span>
              </div>
              <div 
                className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-medium"
                dangerouslySetInnerHTML={{ __html: block.question_details }}
              />
            </div>

            <div className="p-8 space-y-8">
              {(block.type === "identify_info" || block.type === "identify_info_yn") && (
                <div className="space-y-6">
                  {block.questions.map((q) => (
                    <div key={q.serial_number} className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 dark:bg-slate-800/20 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm shadow-sm border border-gray-100 dark:border-slate-600">
                          {q.serial_number}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 font-medium">{q.text}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswerChange(q.serial_number, opt)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                              answers[q.serial_number] === opt
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-gray-200 dark:border-slate-700 hover:border-indigo-400"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {block.type === "fill_gap" && (
                <div className="space-y-8">
                   <div 
                    className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 exam-content"
                    dangerouslySetInnerHTML={{ __html: block.instruction }}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
                    {block.questions.map((q) => (
                      <div key={q.serial_number} className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Answer {q.serial_number}</label>
                        <input
                          type="text"
                          placeholder={`Enter answer ${q.serial_number}...`}
                          value={answers[q.serial_number] || ""}
                          onChange={(e) => handleAnswerChange(q.serial_number, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all font-medium dark:text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Auto-save notification */}
      <div className="fixed bottom-6 left-6 flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-lg border border-gray-100 dark:border-slate-800">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Auto-save</span>
      </div>
    </div>
  );
};

export default StartExam;
