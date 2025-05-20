import React from 'react'

const SongContext = React.createContext({
  isPlayedOnce: false,
  songDetails: {},
  updateSong: () => {},
  isSongPlaying: false,
  updateSongState: () => {},
  audio: null,
  updateAudio: () => {},
})

export default SongContext
