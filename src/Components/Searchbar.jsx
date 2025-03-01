import React from 'react'

const Searchbar = () => {
  return (
    <>
   <div className="search-container">
   <div className="search-box">
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
   </div>
    </>
  )
}

export default Searchbar ; 
