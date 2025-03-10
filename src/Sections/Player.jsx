import React, { useRef, useState, useEffect } from 'react';
import { useMusic } from '../Context/MusicContext';
import '../assets/SectionStyles/player.scss';
import cover from '../assets/Images/Cover_.gif';
import { 
  Play,
  Pause,
  SkipBack, 
  SkipForward, 
  Volume2,
  MoreHorizontal, 
  VolumeX
} from 'lucide-react';

const Player = () => {
  const { 
    currentSong,
    isPlaying,
    playPause,
    progress,
    handleSeek,
    handleNext,
    handlePrevious,
    audioElement,
    hideControls, 
    setHideControls, 
  } = useMusic();
  
  const progressBarRef = useRef(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [seekingProgress, setSeekingProgress] = useState(0);

  useEffect(() => {
    if (!isSeeking) {
      setSeekingProgress(progress);
    }
  }, [progress, isSeeking]);

  // Calculate position based on input event (works for both mouse and touch)
  const calculatePosition = (e) => {
    if (!progressBarRef.current || !audioElement) return 0;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const pos = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return pos;
  };

  // Unified handler for both mouse and touch events
  const handleInteractionStart = (e) => {
    setIsSeeking(true);
    const pos = calculatePosition(e);
    setSeekingProgress(pos * 100);
  };

  const handleInteractionMove = (e) => {
    if (isSeeking) {
      const pos = calculatePosition(e);
      setSeekingProgress(pos * 100);
    }
  };

  const handleInteractionEnd = (e) => {
    if (isSeeking && audioElement) {
      setIsSeeking(false);
      const pos = calculatePosition(e);
      handleSeek(pos * audioElement.duration);
    }
  };

  // Handle clicks without dragging
  const handleProgressClick = (e) => {
    if (audioElement) {
      const pos = calculatePosition(e);
      handleSeek(pos * audioElement.duration);
    }
  };

  const handleMuteToggle = () => {
    if (audioElement) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioElement.muted = newMutedState;
    }
  };

  return (
    <div className="player-wrapper">   
      <div className="music-player">
        <div className="song-info">
          <h1 className="song-title">{currentSong?.name || 'Select a song'}</h1>
          <p className="artist-name">{currentSong?.artist}</p>
        </div>
        
        <div className="album-cover">
          <img 
            src={currentSong?.cover 
              ? `https://cms.samespace.com/assets/${currentSong.cover}`
              : cover}
            alt="Album Cover" 
            className="cover-art"
          />
        </div>
       {!hideControls && (
        <div 
          className="progress-bar" 
          ref={progressBarRef}
          onClick={handleProgressClick}
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
          onMouseMove={handleInteractionMove}
          onTouchMove={handleInteractionMove}
          onMouseUp={handleInteractionEnd}
          onTouchEnd={handleInteractionEnd}
          onMouseLeave={() => isSeeking && setIsSeeking(false)}
        >
          <div 
            className="progress-fill" 
            style={{ width: `${isSeeking ? seekingProgress : progress}%` }}
          ></div>
        </div>
       )}
       {!hideControls && (
        <div className="controls">
          <button className="control-btn more">
            <MoreHorizontal size={24} strokeWidth={1.5} />
          </button>
          <button className="control-btn prev" onClick={handlePrevious}>
            <SkipBack size={24} strokeWidth={1.5} />
          </button>
          <button className="control-btn play" onClick={playPause}>
            {isPlaying ? (
              <Pause size={24} strokeWidth={1.5} />
            ) : (
              <Play size={24} strokeWidth={1.5} />
            )}
          </button>
          <button className="control-btn next" onClick={handleNext}>
            <SkipForward size={24} strokeWidth={1.5} />
          </button>
          <button className="control-btn volume" onClick={handleMuteToggle}>
            {isMuted ? (
              <VolumeX size={24} strokeWidth={1.5} />
            ) : (
              <Volume2 size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
       )}
      </div>
    </div>
  );
};

export default Player;