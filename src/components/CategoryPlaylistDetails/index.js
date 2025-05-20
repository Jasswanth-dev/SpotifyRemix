import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from '../Loader'
import SideBar from '../SideBar'
import BackButton from '../BackButton'
import FailureView from '../FailureView'
import CategoryPlaylistDetailItem from '../CategoryPlaylistDetailItem'

import './index.css'

const apiConstantStatus = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class CategoryPlaylistDetails extends Component {
  state = {apiStatus: apiConstantStatus.initial, playlist: {}}

  componentDidMount() {
    this.getCategoryPlaylistDetails()
  }

  getCategoryPlaylistDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const apiUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const options = {
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updateData = fetchedData.playlists.items.map(each => ({
        id: each.id,
        image: each.images[0].url,
        name: each.name,
        tracks: each.tracks.total,
      }))
      this.setState({
        playlist: updateData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {playlist} = this.state
    return (
      <>
        <h1 className="category-heading">Category</h1>
        <ul className="category-unorderd-list">
          {playlist.map(each => (
            <CategoryPlaylistDetailItem details={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.inProgress:
        return <Loader />
      case apiConstantStatus.success:
        return this.renderSuccessView()
      case apiConstantStatus.failure:
        return <FailureView tryAgain={this.getFeaturedPlaylistDetails} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <SideBar className="desktop-sidebar" />
        <div className="main-div">
          <div className="playlists-container">
            <BackButton />
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryPlaylistDetails
