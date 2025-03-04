import React from 'react'
import { Search } from 'lucide-react';
import { useMusic } from '../Context/MusicContext';
import '../assets/componentStyles/SearchBar.scss'

const Searchbar = () => {
    const { searchTerm, setSearchTerm } = useMusic();

    return (
    <div className="search-container">
        <div className="search-box">
            <input
                type="text"
                placeholder="Search Song, Artist"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={24} />
        </div>
    </div>
    )
}

export default Searchbar;