import React, { useEffect, useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Music = () => {
  const [songs, setSongs] = useState([]);
  const { playwithId, updateSongList } = useContext(PlayerContext);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(
          "https://v1.nocodeapi.com/vaibhavx14/spotify/ZkeAvObBCUZOVHvZ/search?q=arijit&type=track"
        );
        const data = await res.json();
        const items = data.tracks.items.filter(item => item.preview_url); // Only use playable tracks
        setSongs(items);
        updateSongList(items); // Update context song list
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6">Top Hindi Tracks</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Artist</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="clock icon" />
      </div>

      <hr />

      {songs.length === 0 ? (
        <p className="text-center mt-4 text-[#a7a7a7]">Loading music...</p>
      ) : (
        songs.map((item, index) => (
          <div
            key={item.id}
            onClick={() => playwithId(item.id)}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.album.images[0]?.url} alt="cover" />
              {item.name}
            </p>
            <p className="text-[15px]">{item.album.name}</p>
            <p className="text-[15px] hidden sm:block">{item.artists[0]?.name}</p>
            <p className="text-[15px] text-center">
              {Math.floor(item.duration_ms / 60000)}:
              {((item.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Music;
