import {Link} from 'react-router-dom'
import SiderBar from '../SideBar'

import './index.css'

const NotFound = () => (
  <div className="bg-container">
    <SiderBar className="desktop-sidebar" />
    <div className="main-container">
      <Link to="/">
        <button type="button" className="home-btn">
          Home Page
        </button>
      </Link>
      <div className="notfound-container">
        <img
          className="notfound-image"
          src="https://res.cloudinary.com/dh4jylmaa/image/upload/v1744191029/Not_Found_404_hoyskb.png"
          alt="page not found"
        />
        <h1 className="notfound-text">Page Not Found</h1>
      </div>
    </div>
  </div>
)

export default NotFound
