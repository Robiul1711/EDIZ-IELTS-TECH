import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#141414] border border-white/10 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 mb-8 border border-emerald-500/20"
        >
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Payment Successful!</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Your transaction has been processed successfully. You can now access all your premium features.
        </p>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200"
          >
            Go to Home
            <ArrowRight className="w-5 h-5" />
          </motion.button>

        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-sm text-gray-500">
            Having trouble? <span className="text-emerald-500 cursor-pointer hover:underline">Contact Support</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
