import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import Music from './Music';
import { albumsData } from '../assets/assets';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');
  const albumId = isAlbum ? location.pathname.slice(-1) : '';
  const bgColor = albumsData[Number(albumId)]?.bgColor || '#000'; // add fallback for safety

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.backgroundImage = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.backgroundImage = 'none';
      displayRef.current.style.backgroundColor = '#121212';
    }
  }, [location.pathname]);

  return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded text-white overflow-auto bg-[#121212] lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </div>
  );
};

export default Display;
