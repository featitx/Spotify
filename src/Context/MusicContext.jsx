// src/contexts/MusicContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('For You');
  const [audioElement, setAudioElement] = useState(new Audio());
  const [hideControls , setHideControls] = useState(true); 




  useEffect(() => {
    fetch('https://cms.samespace.com/items/songs')
      .then(res => res.json())
      .then(data => setSongs(data.data));
  }, []);

  useEffect(() => {
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('ended', handleNext);
    return () => {
      audioElement.removeEventListener('timeupdate', updateProgress);
      audioElement.removeEventListener('ended', handleNext);
    };
  }, [currentSong]);
  

  const playPause = () => {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    const percentage = (audioElement.currentTime / audioElement.duration) * 100;
    setProgress(percentage);
  };

 
  const handleNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    audioElement.src = songs[nextIndex].url;
    audioElement.play();
    setIsPlaying(true);
  };
  
  const handlePrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const prevIndex = currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
    audioElement.src = songs[prevIndex].url;
    audioElement.play();
    setIsPlaying(true);
  };

  const handleSeek = (timeInSeconds) => {
    if (audioElement) {
      audioElement.currentTime = timeInSeconds;
      setProgress((timeInSeconds / audioElement.duration) * 100);
    }
  };

  const value = {
    songs,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying , 
    playPause,
    progress,
    handleSeek,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    audioElement,
    handlePrevious,
    handleNext,
    hideControls, 
    setHideControls, 
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

export const useMusic = () => useContext(MusicContext);