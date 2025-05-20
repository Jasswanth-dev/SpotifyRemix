import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from '../Loader'
import CategoryCard from '../CategoryCard'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'initial',
  inProgress: 'inprogress',
  failure: 'failure',
  success: 'success',
}

class CategoryPlaylists extends Component {
  state = {apiStatus: apiStatusConstants.initial, playlists: []}

  componentDidMount() {
    this.getCategoriesPlaylists()
  }

  getCategoriesPlaylists = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/categories'
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
      const {items} = fetchedData.categories
      const updatedData = items.map(each => ({
        id: each.id,
        name: each.name,
        image: each.icons[0].url,
      }))
      this.setState({
        playlists: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => <Loader className="geners-failure-container" />

  renderFailureView = () => (
    <FailureView
      className="geners-failure-container"
      tryAgain={this.getCategoriesPlaylists}
    />
  )

  renderSuccessView = () => {
    const {playlists} = this.state
    return (
      <ul className="albums-unorder-list ">
        {playlists.map(each => (
          <CategoryCard details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default CategoryPlaylists
