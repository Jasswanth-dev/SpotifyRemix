import SongItem from '../SongItem'
import './index.css'

const Songs = props => {
  const {tracks} = props
  return (
    <ul className="songs-unorder-list">
      {tracks.map(each => (
        <SongItem key={each.id} details={each} />
      ))}
    </ul>
  )
}

export default Songs
