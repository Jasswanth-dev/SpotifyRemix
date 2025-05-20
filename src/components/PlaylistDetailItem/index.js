import SongContext from '../../SongContext'
import './index.css'

const PlaylistDetailItem = props => {
  const {details} = props
  const {songName, albumName, artist, duration, addedAt, sno, id} = details
  return (
    <SongContext.Consumer>
      {value => {
        const {updateSong, songDetails} = value
        const isPlaying = id === songDetails.id
        const playSong = () => {
          updateSong(details)
        }
        return (
          <tr onClick={playSong} className={isPlaying ? 'playing-track' : ''}>
            <td className="starting-left">{sno}</td>
            <td>{songName}</td>
            <td>{albumName}</td>
            <td>{duration}</td>
            <td>{artist}</td>
            <td className="ending-right">{addedAt}</td>
          </tr>
        )
      }}
    </SongContext.Consumer>
  )
}

export default PlaylistDetailItem
