import React from 'react';
import { motion } from 'motion/react';
import { XCircle, RefreshCcw, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Failed = () => {
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
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-[80px]" />

        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-500/10 mb-8 border border-rose-500/20"
        >
          <XCircle className="w-12 h-12 text-rose-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Payment Failed</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          We couldn't process your payment. Please check your card details or try again later.
        </p>

        <div className="space-y-4">
          <Link to='/'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <RefreshCcw className="w-5 h-5" />
           Go Back
          </Link>

        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-left bg-black/20 p-4 rounded-xl">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Possible Reasons:</h3>
          <ul className="text-xs text-gray-400 space-y-1 list-disc ml-4">
            <li>Insufficient funds in your account</li>
            <li>Incorrect card information entered</li>
            <li>Transaction declined by your bank</li>
            <li>Network connectivity issue</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Failed;
