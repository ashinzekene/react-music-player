import React from 'react';
import AddSongs from './AddSongs'
import MyAppBar from './MyAppBar'
import SongList from './SongList'
import NowPlaying from './NowPlaying'
import { connect } from 'react-redux'
import { togglePlaying, playNext, playPrevious, playSong } from "../actions";

const mapStateToProps = (state) => ({
  songs: state.songs,
  playState: state.playState
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playNext: () => dispatch(playNext()),
  playPrevious: () => dispatch(playPrevious())
})

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.playSong = this.playSong.bind(this)
    this.loadTime = this.loadTime.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playState !== this.props.playState) {
      if (!nextProps.playState.playing) {
        // RESUME PAUSE
        console.log("pausing")
        this.audioPlayer.pause()
      } else if (nextProps.playState.song === this.props.playState.song) {
        console.log("resuming")
        // RESUME PLAYING
        this.audioPlayer.play()
      } else {
        console.log("Playing")
        this.playSong(nextProps)
      }

    }
  }

  playSong(props) {
    if (props.songs[props.playState.song]) {
      var file = new FileReader()
      file.readAsDataURL(props.songs[props.playState.song])
      file.onload = (e) => {
        this.audioPlayer.src = e.target.result
        this.audioPlayer.play()
      }
    }
  }

  loadTime() {
    // Move later to state
    const currentTime = 100 * this.audioPlayer.currentTime / this.audioPlayer.duration
    this.setState({ currentTime })
  }

  render() {
    let { currentTime } = this.state
    let { songs, playState } = this.props
    return (
      <div>
        <MyAppBar />
        <SongList songs={songs} />
        <AddSongs />
        <audio controls hidden onTimeUpdate={this.loadTime} onEnded={this.props.playNext} ref={(audio) => this.audioPlayer = audio} />
        <NowPlaying playState={ playState } songs={songs} currentTime={currentTime} />
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)