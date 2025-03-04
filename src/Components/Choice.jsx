import React from 'react'
import { useMusic } from '../Context/MusicContext';
import '../assets/componentStyles/Choice.scss'

const Choice = () => {
  const { activeTab, setActiveTab } = useMusic();

  return (
    <div className="choice">
        <h3 
          className={activeTab === 'For You' ? 'active' : ''}
          onClick={() => setActiveTab('For You')}
        >
          For You
        </h3>
        <h3 
          className={activeTab === 'Top Tracks' ? 'active' : ''}
          onClick={() => setActiveTab('Top Tracks')}
        >
          Top Tracks
        </h3>
    </div>
  )
}

export default Choice;