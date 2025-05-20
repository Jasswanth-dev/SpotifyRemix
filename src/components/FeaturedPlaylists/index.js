import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from '../Loader'
import FailureView from '../FailureView'
import EditorCard from '../EditorCard'
import './index.css'

const apiConstantStatus = {
  initial: 'initial',
  inProgress: 'inprogress',
  failure: 'failure',
  success: 'success',
}

class FeaturedPlaylists extends Component {
  state = {apiStatus: apiConstantStatus.initial, playlists: []}

  componentDidMount() {
    this.getFeaturedPlaylists()
  }

  getFeaturedPlaylists = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, option)
    const fetchedData = await response.json()
    if (response.ok) {
      const {items} = fetchedData.playlists
      const updatedData = items.map(each => ({
        id: each.id,
        image: each.images[0].url,
        name: each.name,
      }))
      this.setState({
        playlists: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderLoader = () => <Loader className="editors-failure-container" />

  renderFailureView = () => (
    <FailureView
      tryAgain={this.getFeaturedPlaylists}
      className="editors-failure-container"
    />
  )

  renderSuccessView = () => {
    const {playlists} = this.state
    return (
      <ul className="albums-unorder-list">
        {playlists.map(each => (
          <EditorCard details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.inProgress:
        return this.renderLoader()
      case apiConstantStatus.success:
        return this.renderSuccessView()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default FeaturedPlaylists
