import SongContext from '../../SongContext'
import './index.css'

const SongItem = props => {
  const {details} = props
  const {songName, artist, duration, id} = details
  return (
    <SongContext.Consumer>
      {value => {
        const {updateSong, songDetails} = value
        const isPlaying = id === songDetails.id
        const playSong = () => {
          updateSong(details)
        }
        return (
          <li
            className={`song-list-item ${isPlaying ? 'playing-track' : ''}`}
            onClick={playSong}
          >
            <div>
              <p className="mobile-song-name">{songName}</p>
              <p className="mobile-song-artist">{artist}</p>
            </div>
            <p className="mobile-song-artist">{duration}</p>
          </li>
        )
      }}
    </SongContext.Consumer>
  )
}

export default SongItem
