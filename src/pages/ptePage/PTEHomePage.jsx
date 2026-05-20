import { ImageAssets } from "@/lib/ImageProvider";
import { 
  ChevronRight, 
  Lock, 
  Unlock, 
  Play, 
  FileText, 
  Headphones, 
  BookOpen, 
  Mic, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const PTEHomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("speaking_writing");
  const [expandedTask, setExpandedTask] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  // Fetch PTE test sets from secure endpoint (enabled for all users to allow guest preview)
  const { data: testSets = [], isLoading: loadingTestSets } = useQuery({
    queryKey: ["pte-test-sets"],
    queryFn: async () => {
      const response = await axiosSecure.get("/pte/all-test-sets?type=full");
      return response.data.data || [];
    },
  });

  const fullTest = testSets.find((test) => test.category === "mock_test");
  const readingTest = testSets.find((test) => test.category === "reading");
  const listeningTest = testSets.find((test) => test.category === "listening");
  const speakingTest = testSets.find((test) => test.category === "speaking_writing");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedTest(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getTestStyle = (category) => {
    switch (category) {
      case "mock_test":
        return {
          title: "Full Mock Test",
          description: "Test your readiness under actual exam conditions. Features complete Speaking, Writing, Reading, and Listening modules with comprehensive AI-powered grading.",
          icon: FileText,
          color: "text-[#8370FF]",
          bg: "bg-[#8370FF]/10",
          borderColor: "border-[#8370FF]/30",
          themeColor: "#8370FF",
        };
      case "speaking_writing":
        return {
          title: "Speaking & Writing",
          description: "Measures spoken and written English skills in an academic environment. Includes Read Aloud, Describe Image, Retell Lecture, Essay Writing, etc.",
          icon: Mic,
          color: "text-[#728E08]",
          bg: "bg-[#D7F26F]/10",
          borderColor: "border-[#D7F26F]/30",
          themeColor: "#728E08",
        };
      case "reading":
        return {
          title: "Reading",
          description: "Measures reading comprehension and text analysis skills through multiple task types including fill in the blanks, re-order paragraphs, MCQs, etc.",
          icon: BookOpen,
          color: "text-[#6144D8]",
          bg: "bg-[#B6A4FF]/10",
          borderColor: "border-[#B6A4FF]/30",
          themeColor: "#6144D8",
        };
      case "listening":
        return {
          title: "Listening",
          description: "Measures auditory comprehension of diverse international accents and speech speeds with highlight incorrect words, summary writing, etc.",
          icon: Headphones,
          color: "text-[#B66015]",
          bg: "bg-[#FFCB74]/10",
          borderColor: "border-[#FFCB74]/30",
          themeColor: "#B66015",
        };
      default:
        return {
          title: "General Test",
          description: "PTE Academic standard practice session.",
          icon: FileText,
          color: "text-[#8370FF]",
          bg: "bg-[#8370FF]/10",
          borderColor: "border-[#8370FF]/30",
          themeColor: "#8370FF",
        };
    }
  };

  const formatTaskName = (type) => {
    const mapping = {
      read_aloud: "Read Aloud",
      repeat_sentence: "Repeat Sentence",
      describe_image: "Describe Image",
      retell_lecture: "Retell Lecture",
      answer_short_question: "Answer Short Question",
      summarize_written_text: "Summarize Written Text",
      write_essay: "Write Essay",
      summarize_group_discussion: "Summarize Group Discussion",
      respond_to_situation: "Respond to Situation",
      fill_in_the_blanks_dropdown: "Reading & Writing: Fill in the Blanks",
      multiple_choice_multiple_answer_reading: "Multiple-choice, Choose Multiple Answers",
      re_order_paragraphs: "Re-order Paragraphs",
      fill_in_the_blanks_drag_drop: "Reading: Fill in the Blanks",
      multiple_choice_single_answer_reading: "Multiple-choice, Choose Single Answer",
      summarize_spoken_text: "Summarize Spoken Text",
      multiple_choice_multiple_answer_listening: "Multiple Choice, Choose Multiple Answers",
      fill_in_the_blanks_write_word: "Fill in the Blanks",
      highlight_correct_summary: "Highlight Correct Summary",
      multiple_choice_single_answer_listening: "Multiple Choice, Choose Single Answer",
      select_missing_word: "Select Missing Word",
      highlight_incorrect_words: "Highlight Incorrect Words",
      write_from_dictation: "Write from Dictation"
    };
    return mapping[type] || type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getTaskSection = (type) => {
    const speakingWriting = [
      "read_aloud", "repeat_sentence", "describe_image", "retell_lecture", 
      "answer_short_question", "summarize_written_text", "write_essay", 
      "summarize_group_discussion", "respond_to_situation"
    ];
    const reading = [
      "fill_in_the_blanks_dropdown", "multiple_choice_multiple_answer_reading", 
      "re_order_paragraphs", "fill_in_the_blanks_drag_drop", "multiple_choice_single_answer_reading"
    ];
    const listening = [
      "summarize_spoken_text", "multiple_choice_multiple_answer_listening", 
      "fill_in_the_blanks_write_word", "highlight_correct_summary", 
      "multiple_choice_single_answer_listening", "select_missing_word", 
      "highlight_incorrect_words", "write_from_dictation"
    ];

    if (speakingWriting.includes(type)) return "Speaking & Writing";
    if (reading.includes(type)) return "Reading";
    if (listening.includes(type)) return "Listening";
    return "General";
  };

  const getGroupedStructure = (structure) => {
    if (!structure) return [];
    
    const groups = {};
    structure.forEach((task) => {
      const section = getTaskSection(task.type);
      if (!groups[section]) {
        groups[section] = [];
      }
      groups[section].push({
        name: formatTaskName(task.type),
        count: task.count,
        difficulty: task.difficulty || "Any"
      });
    });

    return Object.entries(groups).map(([sectionName, content]) => ({
      section_name: sectionName,
      content: content
    }));
  };

  const syllabus = {
    speaking_writing: {
      title: "Speaking & Writing",
      duration: "54 - 67 minutes",
      description: "Measures spoken and written English skills in an academic environment.",
      icon: Mic,
      color: "text-[#728E08]",
      bg: "bg-[#D7F26F]/10",
      borderColor: "border-[#D7F26F]/30",
      themeColor: "#728E08",
      tasks: [
        {
          name: "Personal Introduction",
          questions: "1",
          time: "1 minute",
          desc: "An unscored task to introduce yourself. Highly useful for universities to assess your voice signature."
        },
        {
          name: "Read Aloud",
          questions: "6 - 7 questions",
          time: "35-40 seconds per question",
          desc: "Read a short text aloud. Measures reading and speaking capabilities simultaneously."
        },
        {
          name: "Repeat Sentence",
          questions: "10 - 12 questions",
          time: "15 seconds per question",
          desc: "Listen to a recorded sentence and repeat it exactly. Assesses listening and speaking."
        },
        {
          name: "Describe Image",
          questions: "3 - 4 questions",
          time: "40 seconds per question",
          desc: "Analyze and speak about a chart, graph, map, or picture shown on the screen."
        },
        {
          name: "Retell Lecture",
          questions: "1 - 2 questions",
          time: "40 seconds per question",
          desc: "Listen to a short lecture or watch a video clip, then summarize the details in your own words."
        },
        {
          name: "Answer Short Question",
          questions: "5 - 6 questions",
          time: "10 seconds per question",
          desc: "Answer a general knowledge question in one or a few words."
        },
        {
          name: "Summarize Written Text",
          questions: "1 - 2 questions",
          time: "10 minutes per question",
          desc: "Read a short passage and summarize it in a single sentence (up to 75 words)."
        },
        {
          name: "Write Essay",
          questions: "1 - 2 questions",
          time: "20 minutes per question",
          desc: "Write a formal argumentative essay on a given topic (200 - 300 words)."
        }
      ]
    },
    reading: {
      title: "Reading",
      duration: "29 - 30 minutes",
      description: "Measures reading comprehension and text analysis skills through multiple task types.",
      icon: BookOpen,
      color: "text-[#6144D8]",
      bg: "bg-[#B6A4FF]/10",
      borderColor: "border-[#B6A4FF]/30",
      themeColor: "#6144D8",
      tasks: [
        {
          name: "Reading & Writing: Fill in the Blanks",
          questions: "5 - 6 questions",
          time: "Based on total section time",
          desc: "Select the most appropriate words from a drop-down menu to complete the passage text."
        },
        {
          name: "Multiple-choice, choose multiple answers",
          questions: "1 - 2 questions",
          time: "Based on total section time",
          desc: "Read a passage and select all correct answer options from a list of choices."
        },
        {
          name: "Re-order paragraphs",
          questions: "2 - 3 questions",
          time: "Based on total section time",
          desc: "Arrange scrambled text boxes in the correct logical sequence to form a complete paragraph."
        },
        {
          name: "Reading: Fill in the Blanks",
          questions: "4 - 5 questions",
          time: "Based on total section time",
          desc: "Drag words from a word pool and drop them into the correct blank spaces in a passage."
        },
        {
          name: "Multiple-choice, choose single answer",
          questions: "1 - 2 questions",
          time: "Based on total section time",
          desc: "Read a passage and answer a single-choice question based on content analysis."
        }
      ]
    },
    listening: {
      title: "Listening",
      duration: "30 - 43 minutes",
      description: "Measures auditory comprehension of diverse international accents and speech speeds.",
      icon: Headphones,
      color: "text-[#B66015]",
      bg: "bg-[#FFCB74]/10",
      borderColor: "border-[#FFCB74]/30",
      themeColor: "#B66015",
      tasks: [
        {
          name: "Summarize Spoken Text",
          questions: "1 - 2 questions",
          time: "10 minutes per question",
          desc: "Listen to an audio recording and write a summary paragraph of 50-70 words."
        },
        {
          name: "Multiple Choice, Multiple Answers",
          questions: "1 - 2 questions",
          time: "Based on total section time",
          desc: "Listen to a recording and select all correct options answering the question."
        },
        {
          name: "Fill in the Blanks",
          questions: "2 - 3 questions",
          time: "Based on total section time",
          desc: "Listen to an audio recording and type the missing words to complete the text transcript."
        },
        {
          name: "Highlight Correct Summary",
          questions: "1 - 2 questions",
          time: "Based on total section time",
          desc: "Listen to a recording and choose the paragraph summary that matches the recording best."
        },
        {
          name: "Multiple Choice, Single Answer",
          questions: "1 - 2 questions",
          time: "Based on total section time",
          desc: "Listen to a recording and answer a single-choice question about the talk details."
        },
        {
          name: "Select Missing Word",
          questions: "1 - 2 questions",
          time: "Based on total section time",
          desc: "Listen to a clip with a beep sound replacing the final word/phrase. Choose the correct option."
        },
        {
          name: "Highlight Incorrect Words",
          questions: "2 - 3 questions",
          time: "Based on total section time",
          desc: "Listen to a recording while reading a transcript, then click on words that differ."
        },
        {
          name: "Write from Dictation",
          questions: "3 - 4 questions",
          time: "Based on total section time",
          desc: "Listen to a short sentence and type it exactly with correct spelling and punctuation."
        }
      ]
    }
  };

  const handleAction = (destination) => {
    if (!user) {
      navigate("/auth/login", { state: { from: "/pte" } });
    } else {
      navigate(destination);
    }
  };

  return (
    <div className="section-padding-x py-12 w-full max-w-7xl mx-auto space-y-12 font-poppins">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-slate-400">
        <Link to="/" className="hover:text-Primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-Primary font-bold dark:text-purple-400">PTE Academic</span>
      </nav>

      {/* Hero Header Section */}
      <div className="text-center md:text-left space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white leading-tight">
          Pearson Test of English <br className="hidden md:inline" />
          <span className="text-[#8370FF]">PTE Academic</span> Preparation
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
          Master the global English test for study abroad and migration. Practice with our complete, highly realistic mock tests and section syllabuses.
        </p>
      </div>

      {/* Test Packages Grid Section */}
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-slate-850 dark:text-white">
            Available Mock & Practice Test Packages
          </h2>
          <p className="text-gray-500 dark:text-slate-400 font-medium text-base mt-2">
            Practice under realistic exam conditions. Click on any package to view its full syllabus and structure.
          </p>
        </div>

        {loadingTestSets ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 dark:bg-slate-800 h-48 rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testSets.map((test) => {
              const testStyle = getTestStyle(test.category);
              const Icon = testStyle.icon;
              return (
                <div
                  key={test.id}
                  onClick={() => setSelectedTest(test)}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-gray-200/50 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer hover:border-indigo-400/50"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${testStyle.bg} ${testStyle.color} shadow-sm w-fit`}>
                          <Icon size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-gray-100/50 dark:border-slate-800/50">
                          {test.category === "mock_test" ? "⚡ High-Fidelity Mock" : "🎯 Sub-Section"}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-855 dark:text-white group-hover:text-primary transition-colors">
                        {test.title}
                      </h3>
                      <p className="text-gray-500 dark:text-slate-400 text-sm font-medium line-clamp-2 pr-4">
                        {testStyle.description}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="flex-shrink-0">
                      {user ? (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                          <Unlock size={12} /> Ready
                        </div>
                      ) : (
                        <div className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                          <Lock size={12} /> Locked
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 dark:text-slate-400">
                      <span>Duration: <strong className="text-slate-855 dark:text-slate-200">{test.total_duration} mins</strong></span>
                      <span>•</span>
                      <span>Tasks: <strong className="text-slate-855 dark:text-slate-200">{test.structure?.length || 0} items</strong></span>
                    </div>
                    
                    <span className="text-primary font-bold text-sm flex items-center gap-1.5 transition-transform group-hover:translate-x-1 duration-300">
                      {user ? "Take Test" : "Unlock Details"} <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Syllabus Title & Tabs Header */}
      <div className="space-y-6 pt-4">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
            PTE Academic Syllabus & Sub-Sections
          </h2>
          <p className="text-gray-500 dark:text-slate-400 font-medium text-base mt-2">
            Explore the exact task structures and syllabuses. Review details free or sign in to practice.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-slate-800 pb-2">
          {Object.entries(syllabus).map(([key, data]) => {
            const Icon = data.icon;
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setExpandedTask(null);
                }}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-bold uppercase transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-850'
                }`}
              >
                <Icon size={18} />
                {data.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Syllabus Body Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Syllabus Info & Locked Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`p-8 rounded-[2rem] border ${syllabus[activeTab].borderColor} ${syllabus[activeTab].bg} flex flex-col justify-between h-full min-h-[300px]`}>
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl bg-white dark:bg-slate-950 w-fit ${syllabus[activeTab].color} shadow-sm`}>
                {React.createElement(syllabus[activeTab].icon, { size: 32 })}
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                {syllabus[activeTab].title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
                {syllabus[activeTab].description}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Duration:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-white px-2.5 py-1 bg-white/60 dark:bg-slate-800/40 rounded-lg">{syllabus[activeTab].duration}</span>
              </div>
            </div>

            <div className="pt-8">
              {user ? (
                <button
                  onClick={() => {
                    let path = "/dashboard/pte";
                    if (activeTab === "reading" && readingTest) path = `/dashboard/pte/test-set/${readingTest.id}`;
                    if (activeTab === "listening" && listeningTest) path = `/dashboard/pte/test-set/${listeningTest.id}`;
                    if (activeTab === "speaking_writing" && speakingTest) path = `/dashboard/pte/test-set/${speakingTest.id}`;
                    handleAction(path);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-extrabold rounded-2xl hover:scale-102 transition-transform shadow-md"
                >
                  <Unlock size={18} /> Take Practice Tests <ArrowRight size={16} />
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-yellow-400/10 border border-yellow-400/20 text-yellow-600 dark:text-yellow-400 rounded-xl text-xs font-bold leading-relaxed shadow-inner">
                    <Lock size={16} className="flex-shrink-0" /> Practice tests are locked for guests. Please log in to solve mock items.
                  </div>
                  <button
                    onClick={() => handleAction("/dashboard/pte")}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#8370FF] text-white font-extrabold rounded-2xl hover:bg-[#6c5ce7] transition-all shadow-md"
                  >
                    <Lock size={18} /> Sign In to Practice
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-lg font-black text-slate-850 dark:text-white flex items-center gap-2 px-1">
            📋 Sub-Task Types ({syllabus[activeTab].tasks.length})
          </h4>
          <div className="space-y-3">
            {syllabus[activeTab].tasks.map((task, idx) => {
              const isExpanded = expandedTask === idx;
              return (
                <div 
                  key={idx}
                  className="border border-gray-150 dark:border-slate-850 bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:border-indigo-400"
                >
                  <button
                    onClick={() => setExpandedTask(isExpanded ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-800 dark:text-white text-base md:text-lg block truncate">
                          {task.name}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                          <span>Items: <strong className="text-slate-700 dark:text-slate-300 font-bold">{task.questions}</strong></span>
                          <span>•</span>
                          <span>Time: <strong className="text-slate-700 dark:text-slate-300 font-bold">{task.time}</strong></span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-gray-100 dark:border-slate-850 animate-in fade-in slide-in-from-top-1 duration-200 bg-gray-50/50 dark:bg-slate-800/10">
                      <p className="text-gray-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
                        {task.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Test Structure Details Modal */}
      {selectedTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-150 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 animate-out fade-out duration-200"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-850 dark:text-white uppercase tracking-wide">
                    {selectedTest.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/60 px-3 py-1 rounded-full border border-gray-100 dark:border-slate-800">
                    {selectedTest.total_duration} Mins
                  </span>
                </div>
                <p className="text-gray-500 dark:text-slate-400 font-medium text-sm md:text-base">
                  Detailed Test Structure and Syllabus Breakdown
                </p>
              </div>
              
              <button 
                onClick={() => setSelectedTest(null)}
                className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 hover:text-slate-855 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent flex-1 space-y-6">
              
              {/* Alert Badge for guest */}
              {!user && (
                <div className="flex items-center gap-3 p-4 bg-yellow-400/10 border border-yellow-400/20 text-yellow-700 dark:text-yellow-400 rounded-2xl shadow-inner text-sm font-semibold leading-relaxed">
                  <Lock size={18} className="flex-shrink-0" />
                  <span>
                    Practice tests are locked for guests. Please log in or sign up to attempt this mock test package.
                  </span>
                </div>
              )}

              {/* Table wrapper */}
              <div className="border border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/40 border-b border-gray-200 dark:border-slate-800">
                        <th className="py-4 px-6 font-black text-sm text-slate-855 dark:text-slate-200 uppercase tracking-wider text-center w-1/3">
                          Section
                        </th>
                        <th className="py-4 px-6 font-black text-sm text-slate-855 dark:text-slate-200 uppercase tracking-wider w-1/3">
                          Task Type
                        </th>
                        <th className="py-4 px-6 font-black text-sm text-slate-855 dark:text-slate-200 uppercase tracking-wider text-center w-1/3">
                          Questions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getGroupedStructure(selectedTest.structure).map((section, sIdx) => (
                        <React.Fragment key={sIdx}>
                          {section.content.map((item, cIdx) => (
                            <tr
                              key={`${sIdx}-${cIdx}`}
                              className="border-b border-gray-100 dark:border-slate-800/60 last:border-b-0 hover:bg-slate-50/30 dark:hover:bg-slate-850/10 transition-colors"
                            >
                              {cIdx === 0 && (
                                <td
                                  className="py-5 px-6 font-extrabold text-slate-800 dark:text-slate-100 border-r border-gray-150 dark:border-slate-855 align-middle bg-slate-50/10 dark:bg-slate-800/5 text-center text-sm md:text-base"
                                  rowSpan={section.content.length}
                                >
                                  {section.section_name}
                                </td>
                              )}
                              <td className="py-4 px-6 border-r border-gray-150 dark:border-slate-855 text-slate-700 dark:text-slate-355 font-semibold text-sm">
                                {item.name}
                              </td>
                              <td className="py-4 px-6 text-center text-slate-700 dark:text-slate-355 font-bold text-sm">
                                {item.count}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-end items-center gap-3">
              <button 
                onClick={() => setSelectedTest(null)}
                className="w-full sm:w-auto px-6 py-3.5 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm cursor-pointer"
              >
                Close Details
              </button>
              
              {user ? (
                <button
                  onClick={() => {
                    setSelectedTest(null);
                    handleAction(`/dashboard/pte/test-set/${selectedTest.id}`);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-black rounded-2xl hover:scale-102 transition-transform shadow-lg hover:shadow-primary/20 text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play size={16} fill="currentColor" /> Start Practice Test
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedTest(null);
                    handleAction(`/dashboard/pte/test-set/${selectedTest.id}`);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#8370FF] hover:bg-[#6c5ce7] text-white font-black rounded-2xl hover:scale-102 transition-transform shadow-lg hover:shadow-indigo-500/20 text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock size={16} /> Sign In to Practice
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PTEHomePage;
