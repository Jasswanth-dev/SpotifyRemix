import {Link} from 'react-router-dom'
import './index.css'

const EditorCard = props => {
  const {details} = props
  const {image, name, id} = details
  return (
    <li className="card-item">
      <Link to={`/playlist/${id}`} className="card-link">
        <img className="card-image" src={image} alt="featured playlist" />
        <p className="card-name">{name}</p>
      </Link>
    </li>
  )
}

export default EditorCard
