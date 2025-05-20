import {Component} from 'react'
import Cookies from 'js-cookie'
import {getTime, getDuration} from '../DurationFormat'

import Loader from '../Loader'
import SideBar from '../SideBar'
import BackButton from '../BackButton'
import FailureView from '../FailureView'
import AlbumDetailItem from '../AlbumDetailItem'
import AudioPlayer from '../AudioPlayer'
import SongContext from '../../SongContext'
import Songs from '../Songs'

import './index.css'

const apiConstantStatus = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class AlbumDetails extends Component {
  state = {apiStatus: apiConstantStatus.initial, playlistDetails: {}}

  componentDidMount() {
    this.getAlbumDetails()
  }

  getAlbumDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const apiUrl = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const options = {
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    let count = 0
    if (response.ok) {
      const updatedData = {
        name: fetchedData.name,
        image: fetchedData.images[0].url,
        addedAt: getDuration(fetchedData.release_date),
        popularity: fetchedData.popularity,
        tracks: fetchedData.tracks.items.map(each => {
          count += 1
          return {
            sno: count,
            id: each.id,
            songName: each.name,
            artist: each.artists[0].name,
            duration: getTime(each.duration_ms),
            song: each.preview_url,
            albumName: fetchedData.name,
            image: fetchedData.images[0].url,
            addedAt: getDuration(fetchedData.release_date),
          }
        }),
      }
      this.setState({
        playlistDetails: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {playlistDetails} = this.state
    const {image, name, tracks, addedAt, artist} = playlistDetails
    return (
      <>
        <div className="playlists-details-container">
          <img className="playlist-image" src={image} alt={name} />
          <div>
            <h6>New Releases</h6>
            <h1 className="playlist-name">{name}</h1>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Track</th>
              <th>Album</th>
              <th>Time</th>
              <th>Artist</th>
              <th>Added</th>
            </tr>
            <tr>
              <td colSpan="6">
                <div className="table-horizontal-line">{` `}</div>
              </td>
            </tr>
          </thead>
          <tbody>
            {tracks.map(each => (
              <AlbumDetailItem
                details={each}
                addedAt={addedAt}
                artist={artist}
                albumName={name}
                key={each.id}
              />
            ))}
          </tbody>
        </table>
        <Songs tracks={tracks} />
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
        return <FailureView tryAgain={this.getAlbumDetails} />
      default:
        return null
    }
  }

  render() {
    return (
      <SongContext.Consumer>
        {value => {
          const {isPlayedAny} = value
          return (
            <div className="bg-container">
              <SideBar className="desktop-sidebar" />
              <div className="main-div">
                <div className="playlists-container">
                  <BackButton />
                  {this.renderContent()}
                </div>
                {isPlayedAny && <AudioPlayer />}
              </div>
            </div>
          )
        }}
      </SongContext.Consumer>
    )
  }
}

export default AlbumDetails
