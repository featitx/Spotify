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

  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * audioElement.duration;
    handleSeek(newTime);
  };

  const handleMouseDown = (e) => {
    setIsSeeking(true);
    handleProgressClick(e);
  };

  const handleMouseMove = (e) => {
    if (isSeeking && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const newProgress = pos * 100;
      
      
      setSeekingProgress(newProgress);
      
     
      const timeoutId = setTimeout(() => {
        if (isSeeking) {
          handleSeek(pos * audioElement.duration);
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  };

  const handleMouseUp = (e) => {
    if (isSeeking) {
      setIsSeeking(false);
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      handleSeek(pos * audioElement.duration);
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audioElement.muted = newMutedState;
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
   {isPlaying ? (
        <div 
          className="progress-bar" 
          ref={progressBarRef}
          onClick={handleProgressClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsSeeking(false)}
        >
          <div 
            className="progress-fill" 
            style={{ width: `${isSeeking ? seekingProgress : progress}%` }}
          ></div>
        </div>
 ) : ''}

{isPlaying ? (  
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
        ) : ''}
      </div>  
    </div>
  );
};

export default Player;