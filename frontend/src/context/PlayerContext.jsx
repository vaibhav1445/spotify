import React, { createContext, useState, useRef, useEffect } from 'react';
import { songsData } from '../assets/assets';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(null); // initially no track selected
  const [playStatus, setPlayStatus] = useState(false);
  const [songList, setSongList] = useState(songsData); // fallback default list
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 }
  });

  const updateSongList = (newList) => {
    setSongList(newList);
  };

  const play = () => {
    if (audioRef.current && track?.file) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playwithId = async (id) => {
    const song = songList.find(item => item.id === id || item.track?.id === id);

    if (!song) {
      console.warn('Song not found in songList');
      return;
    }

    const playableTrack = {
      id: song.id || song.track?.id,
      name: song.name || song.track?.name,
      image: song.image || song.album?.images?.[0]?.url,
      file: song.file || song.preview_url, // from Spotify API
      artist: song.artist || song.artists?.[0]?.name || "Unknown"
    };

    setTrack(playableTrack);

    setTimeout(() => {
      if (audioRef.current && playableTrack.file) {
        audioRef.current.play()
          .then(() => setPlayStatus(true))
          .catch((err) => console.error('Audio playback failed:', err));
      }
    }, 100);
  };

  const previous = async () => {
    if (!track) return;
    const index = songList.findIndex(item => item.id === track.id);
    if (index > 0) {
      playwithId(songList[index - 1].id);
    }
  };

  const next = async () => {
    if (!track) return;
    const index = songList.findIndex(item => item.id === track.id);
    if (index < songList.length - 1) {
      playwithId(songList[index + 1].id);
    }
  };

  const seek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          if (!audioRef.current.duration) return;

          seekBar.current.style.width = `${Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100)}%`;

          setTime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60),
              minute: Math.floor(audioRef.current.currentTime / 60)
            },
            totalTime: {
              second: Math.floor(audioRef.current.duration % 60),
              minute: Math.floor(audioRef.current.duration / 60)
            }
          });
        };
      }
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    songList,
    updateSongList,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playwithId,
    previous,
    next,
    seek
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
