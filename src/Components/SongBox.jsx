import React, { useEffect, useState } from "react";
import '../assets/componentStyles/SongBox.scss';
import  {useMusic} from '../Context/MusicContext'



const SongContainer = ({ song }) => {
  
  const { setCurrentSong, audioElement, isPlaying,  setIsPlaying , currentSong } = useMusic();

  const [formattedDuration, setFormattedDuration] = useState('0:00');



  useEffect(() => {
    // Create a temporary audio element to get duration
    const tempAudio = new Audio(song.url);
    
    const handleLoadedMetadata = () => {
      const minutes = Math.floor(tempAudio.duration / 60);
      const seconds = Math.floor(tempAudio.duration % 60);
      setFormattedDuration(
        `${minutes}:${seconds.toString().padStart(2, '0')}`
      );
    };

    tempAudio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      tempAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      tempAudio.pause();
      tempAudio.removeAttribute('src');
    };
  }, [song.url]); 

 

  const handlePlay = () => {
    if (currentSong?.id === song.id) {
      // Toggle play/pause for current song
      if (audioElement.paused) {
        audioElement.play();
        setIsPlaying(true);
      } else {
        audioElement.pause();
        setIsPlaying(false);
      }
    } else {
      // New song, play it and set state
      setCurrentSong(song);
      audioElement.src = song.url;
      audioElement.play();
      setIsPlaying(true);
    }
  };


  return (
    <div className="song-container" onClick={handlePlay}>
      <div className="artist-profile">
        <img 
          src={`https://cms.samespace.com/assets/${song.cover}`} 
          alt={`${song.name} by ${song.artist}`} 
        />
      </div>
      <div className="info">
        <h3 className="title">{song.name}</h3>
        <p className="artist">{song.artist}</p>
      </div>
      <div className="duration">{formattedDuration}</div>
      
    </div>
  );
};
export default SongContainer ;






