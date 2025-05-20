import {Link} from 'react-router-dom'

const NewReleaseCard = props => {
  const {details} = props
  const {image, name, id} = details
  return (
    <li className="card-item">
      <Link to={`/album/${id}`} className="card-link">
        <img className="card-image" src={image} alt="'new release album'" />
        <p className="card-name">{name}</p>
      </Link>
    </li>
  )
}

export default NewReleaseCard
