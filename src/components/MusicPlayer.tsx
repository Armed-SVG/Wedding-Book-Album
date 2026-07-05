import React, { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX, Play, Pause, ChevronUp, ChevronDown } from "lucide-react";
import { Song } from "../types";

const ROMANTIC_PLAYLIST: Song[] = [
  {
    id: "song-1",
    title: "Melodi Cinta (Slow Piano & Violin)",
    artist: "Armed & Tasya Romantic Melody",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "song-2",
    title: "Janji Suci (Romantic Violin & Piano)",
    artist: "Armed & Tasya Slow Melody",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "song-3",
    title: "Cinta Sejati (Beautiful Slow Piano)",
    artist: "Armed & Tasya Romantic Instrumental",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  }
];

interface MusicPlayerProps {
  playTrigger: boolean;
}

export default function MusicPlayer({ playTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = ROMANTIC_PLAYLIST[currentSongIndex];

  // Watch the play trigger from the parent (which fires when the gate opens)
  useEffect(() => {
    if (playTrigger) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Autoplay was prevented, waiting for user click.", err);
          setIsPlaying(false);
        });
      }
    }
  }, [playTrigger]);

  // Handle play/pause toggle
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  // Update volume and mute state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % ROMANTIC_PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + ROMANTIC_PLAYLIST.length) % ROMANTIC_PLAYLIST.length);
    setIsPlaying(true);
  };

  return (
    <div id="music-player-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* HTML Audio element */}
      <audio
        ref={audioRef}
        src={currentSong.url}
        loop
        onEnded={handleNextSong}
      />

      {/* Expanded Playlist Card */}
      {isExpanded && (
        <div className="bg-white/95 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-4 shadow-xl mb-3 w-64 text-brand-charcoal transition-all duration-300 transform origin-bottom-right">
          <h4 className="font-serif text-sm font-semibold tracking-wide border-b border-brand-gold/20 pb-2 mb-2 flex items-center gap-1.5 text-brand-gold-dark">
            <Music className="w-4 h-4" /> Romantic Playlist
          </h4>
          
          <div className="space-y-1 mb-3 max-h-36 overflow-y-auto pr-1">
            {ROMANTIC_PLAYLIST.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(idx);
                  setIsPlaying(true);
                }}
                className={`w-full text-left text-xs p-2 rounded-lg transition-colors flex items-center justify-between ${
                  idx === currentSongIndex
                    ? "bg-brand-gold/10 text-brand-gold-dark font-medium border-l-2 border-brand-gold"
                    : "hover:bg-brand-cream text-brand-charcoal/70"
                }`}
              >
                <div className="truncate pr-2">
                  <p className="truncate font-sans font-medium">{song.title}</p>
                  <p className="text-[10px] text-brand-charcoal/40 font-light">{song.artist}</p>
                </div>
                {idx === currentSongIndex && isPlaying && (
                  <div className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 bg-brand-gold animate-[pulse_0.6s_infinite_alternate]" style={{height: '100%'}} />
                    <span className="w-0.5 bg-brand-gold animate-[pulse_0.4s_infinite_alternate_0.2s]" style={{height: '60%'}} />
                    <span className="w-0.5 bg-brand-gold animate-[pulse_0.5s_infinite_alternate_0.1s]" style={{height: '80%'}} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 border-t border-brand-gold/10 pt-2.5">
            <button
              onClick={handleMuteToggle}
              className="text-brand-charcoal/60 hover:text-brand-gold transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-full h-1 bg-brand-gold-light rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
          </div>
        </div>
      )}

      {/* Main Floating Controller bar */}
      <div className="flex items-center gap-2.5 bg-brand-charcoal/90 hover:bg-brand-charcoal text-brand-cream p-2.5 rounded-full shadow-2xl border border-brand-gold/30 backdrop-blur-sm">
        {/* Floating Notes animation */}
        {isPlaying && (
          <div className="absolute -top-12 left-2 w-12 h-12 pointer-events-none">
            <span className="absolute text-brand-gold font-serif text-sm animate-float-note-1 select-none">♫</span>
            <span className="absolute text-brand-gold font-serif text-lg animate-float-note-2 select-none" style={{ left: "20px" }}>♪</span>
            <span className="absolute text-brand-gold font-serif text-xs animate-float-note-3 select-none" style={{ left: "10px" }}>♬</span>
          </div>
        )}

        {/* Vinyl Disc Rotating element */}
        <button
          onClick={handlePlayPause}
          className={`relative w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden border border-brand-gold/40 cursor-pointer shadow-lg group ${
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
          }`}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-0.5 rounded-full border border-zinc-800 border-dashed" />
          <div className="absolute inset-2 rounded-full border border-zinc-900" />
          <div className="absolute inset-3.5 rounded-full border border-zinc-850" />
          
          {/* Song Center Label */}
          <div className="w-3.5 h-3.5 rounded-full bg-brand-gold flex items-center justify-center z-10">
            <div className="w-1 h-1 rounded-full bg-black" />
          </div>

          {/* Hover Play/Pause overlay */}
          <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-20">
            {isPlaying ? (
              <Pause className="w-4 h-4 text-brand-cream" />
            ) : (
              <Play className="w-4 h-4 text-brand-gold fill-brand-gold" />
            )}
          </div>
        </button>

        {/* Short Track Name Info */}
        <div className="text-left max-w-28 pl-1 select-none hidden sm:block">
          <p className="text-[10px] text-brand-cream/95 font-medium truncate tracking-wide leading-tight">
            {currentSong.title}
          </p>
          <p className="text-[8px] text-brand-gold-light/60 truncate font-light leading-none">
            {isPlaying ? "Memutar" : "Berhenti"}
          </p>
        </div>

        {/* Toggle Expand / Playlist button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 hover:bg-brand-gold/20 rounded-full transition-colors text-brand-gold hover:text-brand-cream cursor-pointer"
          title={isExpanded ? "Sembunyikan Menu" : "Tampilkan Menu"}
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
