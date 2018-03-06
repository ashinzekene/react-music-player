import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400 } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddSongs from './components/AddSongs';
import MyAppBar from './components/MyAppBar'
import SongList from './components/SongList'
import NowPlaying from './components/NowPlaying'
import { togglePlaying, playSong } from "./actions";

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
  playSong: id => dispatch(playSong(id))
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
        this.audioPlayer.pause()
      } else if (nextProps.playState.songId === this.props.playState.songId) {
        // RESUME PLAYING
        this.audioPlayer.play()
      } else {
        // Strat playing
        this.playSong(nextProps)
      }

    }
  }

  playNext() {
    this.props
  }

  playSong(props) {
    if (props.songs[props.playState.song]) {
      fileSrc = URL.createObjectURL(props.songs[props.playState.song])
      this.audioPlayer.src = fileSrc
      this.audioPlayer.play()
      // var file = new FileReader()
      // file.readAsDataURL(props.songs[props.playState.song])
      // file.onload = (e) => {
      // }
    }
  }

  updateTime() {
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
          <audio controls hidden onTimeUpdate={this.updateTime} onEnded={this.props.playNext} ref={(audio) => this.audioPlayer = audio} />
          <NowPlaying playState={ playState } songs={songs} currentTime={currentTime} />
        </div>
      </MuiThemeProvider>        
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
