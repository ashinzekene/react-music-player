import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400 } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux'

import AddSongs from './components/AddSongs'
import MyAppBar from './components/MyAppBar'
import SongList from './components/SongList'
import NowPlaying from './components/NowPlaying'
import { togglePlaying, playNext, playPrevious, playSong } from "./actions";

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo400,
  }
});

const mapStateToProps = (state) => ({
  songs: state.songs,
  playState: state.playState
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playNext: () => dispatch(playNext()),
  playPrevious: () => dispatch(playPrevious())
})

class App extends React.Component {
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
      <MuiThemeProvider muiTheme={muiTheme}>      
        <div>
          <MyAppBar />
          <SongList songs={songs} />
          <AddSongs />
          <audio controls hidden onTimeUpdate={this.loadTime} onEnded={this.props.playNext} ref={(audio) => this.audioPlayer = audio} />
          <NowPlaying playState={ playState } songs={songs} currentTime={currentTime} />
        </div>
      </MuiThemeProvider>        
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
