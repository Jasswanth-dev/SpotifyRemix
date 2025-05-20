import {Link} from 'react-router-dom'

const CategoryCard = props => {
  const {details} = props
  const {image, name, id} = details
  return (
    <li className="card-item">
      <Link to={`/category/${id}/playlists`} className="card-link">
        <img className="card-image" src={image} alt="category" />
        <p className="card-name">{name}</p>
      </Link>
    </li>
  )
}

export default CategoryCard
