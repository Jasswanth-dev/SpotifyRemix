import './index.css'

const Loader = props => {
  const {className} = props
  return (
    <div className={`loader ${className}`} data-testid="loader">
      <img
        className="loading-image"
        src="https://res.cloudinary.com/dh4jylmaa/image/upload/v1744114154/Spotify_Logo_znpw1h.png"
        alt="website-logo"
      />
      <h1 className="loader-text">Loading...</h1>
    </div>
  )
}

export default Loader
