import './index.css'

const FailureView = props => {
  const {tryAgain, className} = props
  return (
    <div className={`failure-view ${className !== undefined && className}`}>
      <img
        className="warning-image"
        src="https://res.cloudinary.com/dh4jylmaa/image/upload/v1744193945/Failure_Icon_fea82c.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="tryagain-btn" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
