import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#8370FF]/20 blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#19B0FD]/20 blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="relative mb-8 inline-block">
          <h1 className="text-[150px] font-black text-white/5 leading-none tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#8370FF]/10 backdrop-blur-md text-[#8370FF] px-6 py-2 text-xl font-bold rounded-xl shadow-[0_8px_30px_rgba(131,112,255,0.15)] border border-[#8370FF]/20 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
              Page Not Found
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Looks like you've ventured too far.
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
            We can't seem to find the page you're looking for. It might have been removed, renamed, or temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-800 text-lg font-semibold rounded-2xl text-gray-300 bg-transparent hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-800 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-transparent text-lg font-semibold rounded-2xl text-white bg-[#8370FF] hover:bg-[#6D5BFF] focus:outline-none focus:ring-4 focus:ring-[#8370FF]/30 shadow-[0_8px_30px_rgba(131,112,255,0.2)] hover:shadow-[0_8px_30px_rgba(131,112,255,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
