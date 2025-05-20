import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import PlaylistsDetails from './components/PlaylistsDetails'
import CategoryPlaylistDetails from './components/CategoryPlaylistDetails'
import AlbumDetails from './components/AlbumDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import SongContext from './SongContext'

import './App.css'

let intervalId
class App extends Component {
  state = {
    isPlayedAny: false,
    songDetails: {},
    isSongPlaying: false,
    audio: null,
    currentPlayTime: 0,
    totalPlayTime: 0,
    volume: 1.0,
  }

  componentDidMount() {
    const audio = document.getElementById('audio')
    this.setState({audio})
  }

  // Plays a song when user click on any track
  updateSong = details => {
    this.pauseSong()
    this.setState(
      {
        songDetails: details,
        isPlayedAny: true,
        isSongPlaying: true,
      },
      this.playSong,
    )
  }

  // Toggle of Pause and play Button
  updateSongState = () => {
    const {isSongPlaying} = this.state
    if (isSongPlaying) {
      this.pauseSong()
    } else {
      this.playSong()
    }
    this.setState(prevState => ({isSongPlaying: !prevState.isSongPlaying}))
  }

  // updates Song running time and total time
  getSongCurrentRange = () => {
    const {audio} = this.state
    const {currentTime, duration} = audio
    if (currentTime === duration) {
      this.updateSongState()
    }
    this.setState({currentPlayTime: currentTime, totalPlayTime: duration})
  }

  // playsSong
  playSong = () => {
    const {audio} = this.state
    audio.play()
    intervalId = setInterval(this.getSongCurrentRange, 50)
  }

  // pauses song
  pauseSong = () => {
    const {audio} = this.state
    audio.pause()
    clearInterval(intervalId)
  }

  //  update play time of audio
  updatePlayingTime = value => {
    console.log(value)
    const {audio} = this.state
    audio.currentTime = value
  }

  //  updates Volume
  updateVolume = value => {
    const {audio} = this.state
    audio.volume = value
    this.setState({volume: value})
  }

  render() {
    const {
      isPlayedAny,
      songDetails,
      isSongPlaying,
      volume,
      currentPlayTime,
      totalPlayTime,
    } = this.state
    const {song} = songDetails
    return (
      <SongContext.Provider
        value={{
          isPlayedAny,
          songDetails,
          isSongPlaying,
          updateSong: this.updateSong,
          updateSongState: this.updateSongState,
          currentPlayTime,
          totalPlayTime,
          volume,
          updatePlayingTime: this.updatePlayingTime,
          updateVolume: this.updateVolume,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/playlist/:id"
            component={PlaylistsDetails}
          />
          <ProtectedRoute exact path="/album/:id" component={AlbumDetails} />
          <ProtectedRoute
            exact
            path="/category/:id/playlists"
            component={CategoryPlaylistDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
        <audio src={song} id="audio">
          <track
            kind="captions"
            src="captions_en.vtt"
            srcLang="en"
            label="English"
            default
          />
        </audio>
      </SongContext.Provider>
    )
  }
}

export default App
