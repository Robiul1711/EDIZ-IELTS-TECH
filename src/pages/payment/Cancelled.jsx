import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ArrowLeft, RefreshCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#141414] border border-white/10 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px]" />

        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-500/10 mb-8 border border-amber-500/20"
        >
          <AlertCircle className="w-12 h-12 text-amber-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Payment Cancelled</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The payment process was cancelled. No charges were made to your account. You can try again whenever you're ready.
        </p>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200 border border-white/10"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </motion.button>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-sm text-gray-500">
            Changed your mind? <span onClick={() => navigate('/')} className="text-amber-500 cursor-pointer hover:underline">Return to Pricing</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Cancelled;
