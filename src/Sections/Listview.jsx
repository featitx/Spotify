import React from 'react';
import SongContainer from '../Components/SongBox';
import Searchbar from '../Components/Searchbar';
import Choice from '../Components/Choice';
import '../assets/SectionStyles/Listview.scss'
import { useMusic } from '../Context/MusicContext';

const Listview = () => {
  const { songs, searchTerm, activeTab, loading } = useMusic();

  const filteredSongs = songs?.filter(song => {
    const matchesSearch = song.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'For You' ? true : song.top_track;
    return matchesSearch && matchesTab;
  });

  return (
    <div className='listview-wrapper'>
      <Choice />
      <Searchbar />
      <div className="lists">
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : (
        filteredSongs?.map(song => (
          <SongContainer key={song.id} song={song} />
        ))
      )}
      </div>
    </div>
  );
};

export default Listview ; 
