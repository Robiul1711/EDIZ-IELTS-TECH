import React, { useState, useRef } from "react";
import { File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const PTEMicrophoneCheck = () => {
  const [status, setStatus] = useState("off"); // 'off', 'recording', 'completed'
  const [audioUrl, setAudioUrl] = useState(null);

  // Refs for holding non-state recording data
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(new Audio());

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setStatus("completed");

        // Stop all tracks in the stream to release the microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setStatus("recording");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      setStatus("playing");
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.play();

      audioPlayerRef.current.onended = () => {
        setStatus("completed");
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 font-poppins bg-[#FBFBFF] dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-6 md:mt-12 text-slate-900 dark:text-white">
        Microphone Check
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg font-medium text-center -mt-4 max-w-md px-2">
        This is an opportunity to check that your microphone is working
        correctly.
      </p>

      {/* Record Answer Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl p-6 md:p-10 w-full max-w-md flex flex-col items-center gap-6 border border-gray-100 dark:border-slate-800">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          Record Answer
        </h2>

        <div className="w-full text-left space-y-2 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl">
          <p className="text-gray-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
            Current Status
          </p>
          <p className="text-slate-900 dark:text-slate-200 font-bold text-lg md:text-xl">
            {status === "recording"
              ? "Recording Started..."
              : status === "playing"
              ? "Playing..."
              : status === "completed"
              ? "Recording Finished"
              : "Ready to record"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-[#A22BDE] to-[#8673FF] rounded-full transition-all duration-300 ${
              status === "recording" || status === "playing"
                ? "w-full animate-pulse shadow-[0_0_15px_rgba(162,43,222,0.4)]"
                : status === "completed"
                ? "w-full"
                : "w-0"
            }`}
          ></div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <button
            className={`py-3 md:py-4 rounded-xl font-bold transition-all active:scale-95 text-xs md:text-sm ${
              status === "recording" || status === "playing"
                ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none"
            }`}
            onClick={startRecording}
            disabled={status === "recording" || status === "playing"}
          >
            Record
          </button>
          <button
            className={`py-3 md:py-4 rounded-xl font-bold transition-all active:scale-95 text-xs md:text-sm ${
              !audioUrl || status === "playing"
                ? "bg-gray-100 dark:bg-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none"
            }`}
            onClick={playRecording}
            disabled={!audioUrl || status === "playing"}
          >
            Playback
          </button>
          <button
            className={`py-3 md:py-4 rounded-xl font-bold transition-all active:scale-95 text-xs md:text-sm ${
              status !== "recording"
                ? "bg-gray-100 dark:bg-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed"
                : "bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-100 dark:shadow-none"
            }`}
            onClick={stopRecording}
            disabled={status !== "recording"}
          >
            Stop
          </button>
        </div>
      </div>

      {/* Instructions */}
      <ol className="list-decimal space-y-4 mt-4 text-sm md:text-base lg:text-lg max-w-2xl px-6 font-medium text-slate-700 dark:text-slate-300">
        <li>
          Put on your headset and position the microphone downward near your
          mouth.
        </li>
        <li>
          Click <strong>Record</strong> and say{" "}
          <em>"Testing, testing, one, two, three"</em>.
        </li>
        <li>
          Click <strong>Stop</strong> once you're done speaking.
        </li>
        <li>
          Click <strong>Playback</strong>. You should clearly hear your voice.
        </li>
        <li>
          If you can't hear yourself, please notify the Test Administrator
          immediately.
        </li>
      </ol>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-auto md:mt-6 px-4">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-95">
          <File size={20} /> Save & Exit
        </button>

        <Link to="/pte/listening/keyboard-check" className="w-full md:w-auto">
          <button className="bg-[#A22BDE] hover:bg-[#8e24c5] text-white w-full md:w-auto px-16 py-4 text-base md:text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95">
            Next <MdDoubleArrow />
          </button>
        </Link>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-center text-xs md:text-sm font-medium opacity-60 dark:text-slate-400 max-w-md px-4 mt-4">
        Note: In the actual test, recording and playback start automatically.
        Handlers will be deactivated.
      </p>
    </div>
  );
};

export default PTEMicrophoneCheck;
