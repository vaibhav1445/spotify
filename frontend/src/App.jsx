import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext.jsx';

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />     {/* Static Left Sidebar */}
        <Display />     {/* Central area with routes: /, /album/:id, /music */}
      </div>

      <Player />        {/* Bottom Music Player */}

      {/* ✅ Safe rendering of audio element */}
      {track?.file && (
        <audio ref={audioRef} src={track.file} preload="auto" />
      )}
    </div>
  );
};

export default App;
