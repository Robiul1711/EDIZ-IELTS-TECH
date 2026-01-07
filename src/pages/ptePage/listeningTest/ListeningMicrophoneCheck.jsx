import React, { useState, useRef } from 'react';
import { File } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ListeningMicrophoneCheck = () => {

    const [status, setStatus] = useState('off'); // 'off', 'recording', 'completed'
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
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                setStatus('completed');

                // Stop all tracks in the stream to release the microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setStatus('recording');
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && status === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };

    const playRecording = () => {
        if (audioUrl) {
            setStatus('playing');
            audioPlayerRef.current.src = audioUrl;
            audioPlayerRef.current.play();

            audioPlayerRef.current.onended = () => {
                setStatus('completed');
            };
        }
    };

    return (
        <div className='flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 font-poppins'>
            {/* Header */}
            <h1 className='text-2xl md:text-3xl font-bold text-center mt-6 md:mt-10'>
                Microphone Check
            </h1>
            <p className="text-[#555555] text-lg font-medium text-center -mt-4">
                This Is An Opportunity To Check That Your Microphone Is Working Correctly
            </p>

            {/* Record Answer Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md flex flex-col items-center gap-6 border border-gray-100">
                <h2 className="text-xl font-bold text-black">Record Answer</h2>

                <div className="w-full text-left space-y-2">
                    <p className="text-gray-600 font-semibold">
                        Current Status: <span className="text-black uppercase">{status}</span>
                    </p>
                    <p className="text-black font-bold">
                        {status === 'recording' ? 'Recording Started...' :
                            status === 'playing' ? 'Playing...' :
                                status === 'completed' ? 'Recording Finished' : 'Ready to record'}
                    </p>
                </div>

                {/* Progress Bar (Animate if recording or playing) */}
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r from-[#A22BDE] to-[#8673FF] rounded-full transition-all duration-300 ${(status === 'recording' || status === 'playing') ? 'w-full animate-pulse' : status === 'completed' ? 'w-full' : 'w-0'}`}
                    ></div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-3 gap-3 w-full">
                    <button
                        className={`py-2.5 rounded-lg font-bold transition-all active:scale-95 text-sm ${(status === 'recording' || status === 'playing') ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#8673FF] text-white hover:opacity-90'}`}
                        onClick={startRecording}
                        disabled={status === 'recording' || status === 'playing'}
                    >
                        Record
                    </button>
                    <button
                        className={`py-2.5 rounded-lg font-bold transition-all active:scale-95 text-sm ${(!audioUrl || status === 'playing') ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#8673FF] text-white hover:opacity-90'}`}
                        onClick={playRecording}
                        disabled={!audioUrl || status === 'playing'}
                    >
                        Playback
                    </button>
                    <button
                        className={`py-2.5 rounded-lg font-bold transition-all active:scale-95 text-sm ${status !== 'recording' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#C5B8FF] text-white hover:opacity-90'}`}
                        onClick={stopRecording}
                        disabled={status !== 'recording'}
                    >
                        Stop
                    </button>
                </div>
            </div>

            {/* Instructions */}
            <ol className="list-decimal space-y-3 mt-4 text-base md:text-lg  max-w-2xl px-6">
                <li>Make sure your headset is on and the microphone is in the downward position near your mouth.</li>
                <li>When you are ready, click on the Record button and say "Testing, testing, one, two, three" into the microphone</li>
                <li>After you have spoken, click on the Stop button. Your recording is now complete</li>
                <li>If you can not hear your voice clearly, please raise your hand to get the attention of the Test Administrator</li>
                <li>Now click on the Playback button. You should clearly hear yourself speaking</li>
            </ol>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-auto md:mt-0">
                <button className='bg-black text-white w-full md:w-auto px-8 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95'>
                    <File size={20} /> Save & Exit
                </button>

                <Link to="/pte/listening/keyboard-check">
                    <button className='bg-[#A22BDE] text-white w-full md:w-auto px-16 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95'>
                        Next <MdDoubleArrow />
                    </button>
                </Link>
            </div>

            {/* Footer Disclaimer */}
            <p className="text-center font-medium opacity-70">
                In the actual test, you will not have Record, Playback, and Stop buttons. The voice recording will start automatically.
            </p>
        </div>
    );
};

export default ListeningMicrophoneCheck;