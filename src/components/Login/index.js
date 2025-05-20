import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMessage: '',
  }

  // update username values
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  // update password value
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  // Authenticate User Creditals on Login
  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      this.setState({isError: false})
      const jwtToken = fetchedData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({isError: true, errorMessage: fetchedData.error_msg})
    }
  }

  render() {
    const {username, password, isError, errorMessage} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="login-container" onSubmit={this.submitForm}>
          <div className="website-logo-container">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dh4jylmaa/image/upload/v1744114154/Spotify_Logo_znpw1h.png"
              alt="login website logo"
            />
            <h1 className="website-name">Spotify Remix</h1>
          </div>

          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            className="user-login-input"
            onChange={this.onChangeUsername}
            value={username}
            type="text"
          />

          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            className="user-login-input"
            onChange={this.onChangePassword}
            value={password}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
          {isError && <p className="login-error">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login
