import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seek
  } = useContext(PlayerContext);

  const isTrackAvailable = !!track && !!track.file;

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Left Section - Track Info */}
      <div className="hidden lg:flex items-center gap-4">
        {isTrackAvailable ? (
          <>
            <img className="w-12" src={track.image} alt="Track" />
            <div>
              <p className="font-semibold">{track.name}</p>
              <p className="text-sm text-gray-400">
                {track.artist || track.desc?.slice(0, 12) || "Unknown"}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-400">No track playing</p>
        )}
      </div>

      {/* Center Section - Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4 items-center">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="Previous" />
          {playStatus ? (
            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="Pause" />
          ) : (
            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="Play" />
          )}
          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="Next" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
        </div>

        {/* Seekbar */}
        <div className="flex items-center gap-5 text-sm">
          <p>
            {time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}
          </p>
          <div
            onClick={seek}
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Right Section - Icons */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="Plays" />
        <img className="w-4" src={assets.mic_icon} alt="Mic" />
        <img className="w-4" src={assets.queue_icon} alt="Queue" />
        <img className="w-4" src={assets.speaker_icon} alt="Speaker" />
        <img className="w-4" src={assets.volume_icon} alt="Volume" />
        <div className="w-20 bg-slate-50 h-1 rounded-full cursor-pointer"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="Mini Player" />
        <img className="w-4" src={assets.zoom_icon} alt="Zoom" />
      </div>
    </div>
  );
};

export default Player;
