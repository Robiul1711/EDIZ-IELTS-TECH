import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mic, Play, Pause, CheckCircle2, AlertCircle, Square, RotateCcw } from 'lucide-react';

const AudioTest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnTo = searchParams.get('returnTo') || '/dashboard/ielts';
  
  const [recordingState, setRecordingState] = useState('idle'); // idle, recording, recorded
  const [audioURL, setAudioURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startRecording = async () => {
    try {
      setPermissionError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setRecordingState('recorded');
      };

      mediaRecorder.start();
      setRecordingState('recording');
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setPermissionError(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error(e));
      setHasVerified(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const resetTest = () => {
    setRecordingState('idle');
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
    }
    setIsPlaying(false);
    setHasVerified(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem('hasCompletedAudioTest') === 'true') {
      navigate(returnTo, { replace: true });
    }
  }, [navigate, returnTo]);

  const handleContinue = () => {
    sessionStorage.setItem('hasCompletedAudioTest', 'true');
    navigate(returnTo);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#604CDF]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 space-y-8 relative z-10 backdrop-blur-sm">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-bl from-[#604CDF]/20 to-[#604CDF]/5 rounded-2xl flex items-center justify-center text-[#604CDF] -rotate-3 transition-transform duration-300 relative">
            <Mic size={40} strokeWidth={1.5} />
            {recordingState === 'recording' && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Audio & Mic Check</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Record a short message to verify your microphone and speakers are working correctly.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center gap-5 py-8 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-slate-100 dark:border-slate-700/50 min-h-[200px]">
            
            {recordingState === 'idle' && (
              <button 
                onClick={startRecording}
                className="w-20 h-20 flex items-center justify-center bg-[#604CDF] text-white rounded-full shadow-lg shadow-[#604CDF]/30 hover:scale-105 transition-all duration-300"
              >
                <Mic size={28} />
              </button>
            )}

            {recordingState === 'recording' && (
              <button 
                onClick={stopRecording}
                className="w-20 h-20 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg shadow-red-500/30 hover:scale-105 transition-all duration-300 animate-pulse"
              >
                <Square size={24} className="fill-current" />
              </button>
            )}

            {recordingState === 'recorded' && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={resetTest}
                  className="w-12 h-12 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300"
                  title="Record Again"
                >
                  <RotateCcw size={20} />
                </button>
                <div className="relative group">
                  <div className={`absolute -inset-2 bg-gradient-to-r from-[#604CDF] to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500 ${isPlaying ? 'opacity-75 blur-md' : ''}`}></div>
                  <button 
                    onClick={togglePlayback}
                    className="relative w-20 h-20 flex items-center justify-center bg-[#604CDF] text-white rounded-full shadow-lg shadow-[#604CDF]/30 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    {isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={28} className="fill-current ml-1" />}
                  </button>
                </div>
              </div>
            )}

            {audioURL && (
              <audio 
                ref={audioRef} 
                onEnded={handleEnded}
                src={audioURL}
                className="hidden"
              />
            )}
            
            <div className="text-center">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {recordingState === 'idle' && 'Click to start recording'}
                {recordingState === 'recording' && 'Recording... Speak now!'}
                {recordingState === 'recorded' && (isPlaying ? 'Playing back...' : 'Play to verify your audio')}
              </span>
              {permissionError && (
                <p className="text-xs text-red-500 mt-2 max-w-[250px]">
                  Microphone access denied. Please allow microphone permissions or continue without testing.
                </p>
              )}
            </div>
          </div>

          <div className="h-14">
            {hasVerified ? (
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <CheckCircle2 size={20} className="shrink-0" />
                <span className="text-sm font-semibold">Audio tested successfully!</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3.5 rounded-xl border border-amber-100 dark:border-amber-500/20">
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm font-semibold">Record and play back to verify</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!hasVerified && !permissionError}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            hasVerified || permissionError
              ? 'bg-[#604CDF] hover:bg-[#5E4FD7] shadow-lg shadow-[#604CDF]/30 hover:shadow-[#604CDF]/50 hover:-translate-y-1' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
          }`}
        >
          {permissionError ? 'Continue without testing' : 'Everything works, Continue'}
        </button>
      </div>
    </div>
  );
};

export default AudioTest;
