import SiderBar from '../SideBar'
import FeaturedPlaylists from '../FeaturedPlaylists'
import CategoryPlaylists from '../CategoryPlaylists'
import NewReleasesPlaylists from '../NewReleasesPlaylists'
import SongContext from '../../SongContext'
import AudioPlayer from '../AudioPlayer'
import './index.css'

const Home = () => (
  <SongContext.Consumer>
    {value => {
      const {isPlayedAny} = value
      return (
        <div className="bg-container">
          <SiderBar />
          <div className="main-div">
            <div className="home-container">
              <h1 className="home-main-heading">Editor&apos;s choice</h1>
              <FeaturedPlaylists />
              <h1 className="home-main-heading">Genres & Moods</h1>
              <CategoryPlaylists />
              <h1 className="home-main-heading">New Releases</h1>
              <NewReleasesPlaylists />
            </div>
            {isPlayedAny && <AudioPlayer />}
          </div>
        </div>
      )
    }}
  </SongContext.Consumer>
)

export default Home
