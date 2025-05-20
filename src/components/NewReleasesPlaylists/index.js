import {Component} from 'react'
import Cookies from 'js-cookie'

import NewReleaseCard from '../NewReleaseCard'
import Loader from '../Loader'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'initial',
  inProgress: 'inprogress',
  failure: 'failure',
  success: 'success',
}

class NewReleasesPlaylists extends Component {
  state = {apiStatus: apiStatusConstants.initial, playlists: []}

  componentDidMount() {
    this.getNewReleasesPlaylists()
  }

  getNewReleasesPlaylists = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/new-releases'
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
      const {items} = fetchedData.albums
      const updatedData = items.map(each => ({
        id: each.id,
        name: each.name,
        image: each.images[0].url,
      }))
      this.setState({
        playlists: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => <Loader className="newrelease-failure-container" />

  renderFailureView = () => (
    <FailureView
      className="newrelease-failure-container"
      tryAgain={this.getNewReleasesPlaylists}
    />
  )

  renderSuccessView = () => {
    const {playlists} = this.state
    return (
      <ul className="albums-unorder-list ">
        {playlists.map(each => (
          <NewReleaseCard details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

export default NewReleasesPlaylists
