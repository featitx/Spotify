import React from "react";
import '../assets/componentStyles/SongContainerStyle.scss';

const SongContainer = () => {

    const song = {
        title: "Starboy",
        artist: "The Weeknd",
        duration: "4:16",
        coverUrl: "https://www.wfpusa.org/wp-content/uploads/2021/10/THEWEEKND_profile_cropped_flipped-e1633612936356.jpg"
      };
      
    return(
        <div className="song-container">
        <div className="artist-profile">
          <img src={song.coverUrl} alt={`${song.title} by ${song.artist}`} />
        </div>
        <div className="info">
          <h3 className="title">{song.title}</h3>
          <p className="artist">{song.artist}</p>
        </div>
        <div className="duration">{song.duration}</div>
      </div>
    )
}
export default SongContainer ;






