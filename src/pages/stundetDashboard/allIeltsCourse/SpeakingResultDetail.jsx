import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import { ChevronLeft, ChevronRight, PlayCircle, Loader2 } from "lucide-react";

const SpeakingResultDetail = () => {
  const { test_no } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookNo = searchParams.get("book_no") || searchParams.get("book");
  const type = searchParams.get("type") || "academic";

  const { data: resultData, isLoading, refetch } = useApiQuery({
    queryKey: ["speaking-result", test_no, bookNo, type],
    url: `/ielts/speaking/results`,
    params: { book_no: bookNo, test_no: test_no, type },
    secure: true,
  });

  const [activeTab, setActiveTab] = useState("feedback"); // 'feedback' or 'explanation'
  const [currentSerial, setCurrentSerial] = useState(1);

  const results = resultData?.data?.results || [];
  const currentResult = results.find((r) => r.serial_number === currentSerial) || results[0];

  useEffect(() => {
    if (results.length > 0 && !results.find(r => r.serial_number === currentSerial)) {
      setCurrentSerial(results[0].serial_number);
    }
  }, [results, currentSerial]);

  // Mutations for Feedback and Explanation
  const { mutate: fetchFeedback, isPending: isFetchingFeedback } = useApiMutation({
    url: "/ielts/speaking/tests/feedback",
    method: "POST",
    secure: true,
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: fetchExplanation, isPending: isFetchingExplanation } = useApiMutation({
    url: "/ielts/speaking/tests/explanation",
    method: "POST",
    secure: true,
    onSuccess: () => {
      refetch();
    }
  });

  const handleGenerateFeedback = () => {
    const formData = new FormData();
    formData.append("book_no", bookNo);
    formData.append("test_no", test_no);
    formData.append("type", type);
    formData.append("serial_number", currentSerial);
    fetchFeedback(formData);
  };

  const handleGenerateExplanation = () => {
    const formData = new FormData();
    formData.append("book_no", bookNo);
    formData.append("test_no", test_no);
    formData.append("type", type);
    formData.append("serial_number", currentSerial);
    fetchExplanation(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-500">
        <p>No results found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  // Calculate parts manually assuming a sequential flow or map them if API provides part_no.
  // The JSON doesn't provide part_no in the results array, so we just show all serials.
  
  return (
    <div className="min-h-screen bg-[#FBFBFF] dark:bg-slate-950/40 rounded-2xl ">
      <div className="p-4  space-y-6">
        
        {/* Top Navigation Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6">
          <button
            onClick={() => navigate("/dashboard/ielts/speaking")}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold tracking-widest uppercase">
            Speaking
          </div>

          <div className="flex-1 flex flex-wrap gap-2 justify-center md:justify-start">
            {results.map((r) => (
              <button
                key={r.serial_number}
                onClick={() => setCurrentSerial(r.serial_number)}
                className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-colors ${
                  currentSerial === r.serial_number
                    ? "bg-[#A22BDE] text-white shadow-md shadow-[#A22BDE]/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {r.serial_number}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
             <button 
               onClick={() => {
                 const currentIndex = results.findIndex(r => r.serial_number === currentSerial);
                 if (currentIndex > 0) setCurrentSerial(results[currentIndex - 1].serial_number);
               }}
               disabled={currentSerial === results[0]?.serial_number}
               className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 disabled:opacity-50"
             >
               <ChevronLeft size={20} />
             </button>
             <button 
               onClick={() => {
                 const currentIndex = results.findIndex(r => r.serial_number === currentSerial);
                 if (currentIndex < results.length - 1) setCurrentSerial(results[currentIndex + 1].serial_number);
               }}
               disabled={currentSerial === results[results.length - 1]?.serial_number}
               className="w-10 h-10 rounded-full bg-[#A22BDE] flex items-center justify-center text-white disabled:opacity-50 shadow-lg shadow-[#A22BDE]/30"
             >
               <ChevronRight size={20} />
             </button>
          </div>
        </div>

        {currentResult && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Question & Student Answer */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                 <h3 className="text-slate-500 font-bold mb-2 uppercase tracking-wider text-sm">Q{currentResult.serial_number}</h3>
                 <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-relaxed">
                   {currentResult.question_text || "Speaking Question"} {/* If API adds question text */}
                 </h2>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm">My Answer</h3>
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-4">
                   <audio src={currentResult.audio_url} controls className="w-full h-10" />
                   <p className="text-slate-600 dark:text-slate-300 font-medium text-sm">
                     {currentResult.transcript}
                   </p>
                </div>
              </div>
            </div>

            {/* Middle Column: Score & Model Answer */}
            <div className="lg:col-span-1 space-y-6 lg:border-l lg:border-r border-slate-200 dark:border-slate-800 lg:px-6">
               <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6">
                 <div className="text-4xl font-black text-slate-800 dark:text-white">
                   {currentResult.score ? currentResult.score.toFixed(1) : "0.0"} <span className="text-lg text-slate-400 font-medium">/ 9.0</span>
                 </div>
                 <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Raw Score</div>
               </div>

               <div className="space-y-3">
                 <span className="inline-block px-4 py-1.5 bg-[#604CDF] text-white text-xs font-bold uppercase tracking-widest rounded-full">
                   Model Answer
                 </span>
                 <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-4">
                    {/* Dummy Audio Player for Model Answer if needed */}
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                      <button className="w-8 h-8 flex items-center justify-center bg-[#604CDF] text-white rounded-lg hover:opacity-90">
                        <PlayCircle size={16} />
                      </button>
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-[#604CDF]"></div>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
                      {currentResult.model_answer}
                    </p>
                 </div>
               </div>
            </div>

            {/* Right Column: AI Feedback & Explanation */}
            <div className="lg:col-span-1">
               <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-full">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-black text-[#604CDF] dark:text-[#8673FF]">AI Feedback</h3>
                  </div>
                  
                  <div className="flex-1 p-6 overflow-y-auto">
                    {activeTab === "feedback" && (
                      <div className="space-y-4">
                         {currentResult.feedback === "Feedback is generated upon click." ? (
                           <div className="flex flex-col items-center justify-center h-40 gap-4">
                             <p className="text-slate-500 text-sm text-center">Feedback not generated yet.</p>
                             <button 
                               onClick={handleGenerateFeedback}
                               disabled={isFetchingFeedback}
                               className="px-6 py-2 bg-[#604CDF] text-white rounded-xl font-bold text-sm hover:bg-[#5E4FD7] transition-colors flex items-center gap-2"
                             >
                               {isFetchingFeedback && <Loader2 size={16} className="animate-spin" />}
                               Generate Feedback
                             </button>
                           </div>
                         ) : (
                           <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                             {currentResult.feedback}
                           </p>
                         )}
                      </div>
                    )}

                    {activeTab === "explanation" && (
                      <div className="space-y-4">
                         {currentResult.explanation === "Explanation is generated upon click." ? (
                           <div className="flex flex-col items-center justify-center h-40 gap-4">
                             <p className="text-slate-500 text-sm text-center">Explanation not generated yet.</p>
                             <button 
                               onClick={handleGenerateExplanation}
                               disabled={isFetchingExplanation}
                               className="px-6 py-2 bg-[#604CDF] text-white rounded-xl font-bold text-sm hover:bg-[#5E4FD7] transition-colors flex items-center gap-2"
                             >
                               {isFetchingExplanation && <Loader2 size={16} className="animate-spin" />}
                               Generate Explanation
                             </button>
                           </div>
                         ) : (
                           <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                             {currentResult.explanation}
                           </p>
                         )}
                      </div>
                    )}
                  </div>

                  <div className="p-6 pt-0 space-y-3 mt-auto">
                     <button
                       onClick={() => setActiveTab("explanation")}
                       className={`w-full py-3 rounded-xl font-bold text-sm transition-colors border ${
                         activeTab === "explanation" 
                           ? "bg-slate-100 dark:bg-slate-800 text-[#604CDF] dark:text-[#8673FF] border-slate-200 dark:border-slate-700" 
                           : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-[#604CDF]"
                       }`}
                     >
                       Explanation
                     </button>
                     <button
                       onClick={() => setActiveTab("feedback")}
                       className={`w-full py-3 rounded-xl font-bold text-sm transition-colors border ${
                         activeTab === "feedback" 
                           ? "bg-[#604CDF] text-white border-[#604CDF] shadow-lg shadow-[#604CDF]/20" 
                           : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-[#604CDF]"
                       }`}
                     >
                       Feedback
                     </button>
                  </div>
               </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakingResultDetail;
