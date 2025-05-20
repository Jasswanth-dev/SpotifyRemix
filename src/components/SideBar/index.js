import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {IoMdLogOut} from 'react-icons/io'
import './index.css'

const SideBar = props => {
  const {className} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className={`sidebar ${className}`}>
      <Link to="/">
        <img
          className="sidebar-image"
          src="https://res.cloudinary.com/dh4jylmaa/image/upload/v1744114154/Spotify_Logo_znpw1h.png"
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-btn" onClick={onLogout}>
        <IoMdLogOut className="logout-icon" />
        Logout
      </button>
    </div>
  )
}

export default withRouter(SideBar)
