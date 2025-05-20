import {Link} from 'react-router-dom'
import './index.css'

const CategoryPlaylistDetailItem = props => {
  const {details} = props
  const {image, id, name, tracks} = details

  return (
    <li className="category-album-item">
      <Link to={`/playlist/${id}`} className="card-link category-link">
        <img className="card-image category-image" src={image} alt={name} />
        <div className="album-info">
          <p className="category-album-name">{name}</p>
          <p className="total-tracks">{tracks} Tracks</p>
        </div>
      </Link>
    </li>
  )
}

export default CategoryPlaylistDetailItem
