import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Keyboard, CheckCircle2, AlertCircle } from 'lucide-react';

const KeyboardTest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnTo = searchParams.get('returnTo') || '/dashboard/ielts';
  const [inputValue, setInputValue] = useState('');
  const [isTested, setIsTested] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim().length > 5) {
      setIsTested(true);
    } else {
      setIsTested(false);
    }
  };

  React.useEffect(() => {
    if (sessionStorage.getItem('hasCompletedKeyboardTest') === 'true') {
      navigate(returnTo, { replace: true });
    }
  }, [navigate, returnTo]);

  const handleContinue = () => {
    sessionStorage.setItem('hasCompletedKeyboardTest', 'true');
    navigate(returnTo);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#604CDF]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 space-y-8 relative z-10 backdrop-blur-sm">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[#604CDF]/20 to-[#604CDF]/5 rounded-2xl flex items-center justify-center text-[#604CDF] rotate-3 hover:rotate-0 transition-transform duration-300">
            <Keyboard size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Keyboard Check</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Before we begin your test, let's make sure your keyboard is working correctly. Please type the following phrase:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl font-semibold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700/50">
            "I am ready for the test"
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Start typing here..."
            className="w-full h-32 p-4 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none focus:border-[#604CDF] focus:ring-4 focus:ring-[#604CDF]/10 transition-all text-slate-700 dark:text-slate-200 resize-none font-medium placeholder:text-slate-400"
          ></textarea>

          <div className="h-14">
            {isTested ? (
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <CheckCircle2 size={20} className="shrink-0" />
                <span className="text-sm font-semibold">Keyboard is working properly!</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3.5 rounded-xl border border-amber-100 dark:border-amber-500/20">
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm font-semibold">Please type something to verify</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!isTested}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            isTested 
              ? 'bg-[#604CDF] hover:bg-[#5E4FD7] shadow-lg shadow-[#604CDF]/30 hover:shadow-[#604CDF]/50 hover:-translate-y-1' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
          }`}
        >
          Continue to Test
        </button>
      </div>
    </div>
  );
};

export default KeyboardTest;
