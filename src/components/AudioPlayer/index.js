import {Component} from 'react'
import {IoPauseCircleSharp, IoPlayCircle} from 'react-icons/io5'
import {IoMdVolumeHigh, IoIosPlay, IoIosPause} from 'react-icons/io'
import {getTime} from '../DurationFormat'
import SongContext from '../../SongContext'

import './index.css'

class AudioPlayer extends Component {
  render() {
    return (
      <SongContext.Consumer>
        {value => {
          const {
            isSongPlaying,
            songDetails,
            updateSongState,
            currentPlayTime,
            totalPlayTime,
            volume,
            updatePlayingTime,
            updateVolume,
          } = value

          const changeSongTime = event => {
            updatePlayingTime(event.target.value)
          }

          const changeVolume = event => {
            updateVolume(event.target.value)
          }
          const {songName, artist, image} = songDetails
          const timer = currentPlayTime.isNaN
            ? 0
            : Math.floor(currentPlayTime) * 1000
          const duration = Math.floor(totalPlayTime) * 1000

          return (
            <div className="audioplayer-container">
              <div className="audioplayer-info">
                <img src={image} alt="album" className="audio-player-image" />
                <div>
                  <p className="audio-name">{songName}</p>
                  <p className="audio-artist">{artist}</p>
                </div>
              </div>
              <div className="audioplayer-controls">
                <button
                  type="button"
                  className="audio-control-btn"
                  onClick={updateSongState}
                >
                  {isSongPlaying ? (
                    <IoPauseCircleSharp className="play-pause-icon" />
                  ) : (
                    <IoPlayCircle className="play-pause-icon" />
                  )}
                </button>
                <span>
                  {getTime(timer)}/{getTime(duration)}
                </span>
                <input
                  value={currentPlayTime}
                  min="0"
                  step="0.01"
                  max={totalPlayTime}
                  onChange={changeSongTime}
                  type="range"
                  className="audio-range-input slider"
                />
              </div>
              <div className="volume-control">
                <IoMdVolumeHigh className="volume-icon" />
                <input
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.01"
                  value={volume}
                  onChange={changeVolume}
                  className="volume-range-input"
                />
              </div>
              <button
                type="button"
                className="audio-control-btn mobile"
                onClick={updateSongState}
              >
                {isSongPlaying ? (
                  <IoIosPause className="mobile-play-pause-icon" />
                ) : (
                  <IoIosPlay className="mobile-play-pause-icon" />
                )}
              </button>
            </div>
          )
        }}
      </SongContext.Consumer>
    )
  }
}

export default AudioPlayer
