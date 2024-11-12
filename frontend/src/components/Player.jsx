import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';

export default function Player({ currentTrack }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (currentTrack) {
            setIsPlaying(true);
            audioRef.current.play();
        }
    }, [currentTrack]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={currentTrack.artwork} alt={currentTrack.title} className="w-12 h-12 rounded" />
                    <div>
                        <p className="font-semibold">{currentTrack.title}</p>
                        <p className="text-sm text-gray-400">{currentTrack.username}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-2xl"><FaStepBackward /></button>
                    <button className="text-3xl" onClick={togglePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button className="text-2xl"><FaStepForward /></button>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={(currentTime / duration) * 100 || 0}
                        onChange={handleSeek}
                        className="w-64"
                    />
                    <FaVolumeUp />
                </div>
            </div>
            <audio
                ref={audioRef}
                src={currentTrack.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
}