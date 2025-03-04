import Listview from '../Sections/Listview';
import Sidebar from '../Sections/Sidebar';
import Player from '../Sections/Player';
import '../assets/pageStyles/Home.scss'
import React from 'react'
import { useMusic } from '../Context/MusicContext';

const Home = () => {

  const { currentSong } = useMusic();
  
  return (
    <>
    <div className="home-wrapper"  style={{ 
      background: currentSong?.accent 
        ? `linear-gradient(180deg, ${currentSong.accent} 0%, rgba(0,0,0,0.8) 100%)`
        : '#000',
      transition: 'background 1s ease'
    }}>
        <Sidebar />
        <Listview/>
        <Player/>
    </div>
    </>
  )
}

export default Home ; 
