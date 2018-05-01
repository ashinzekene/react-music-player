import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400, } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux';
import { NOW_PLAYING_PAGE, togglePlaying, playSong } from "./actions";

import MainView from './views/MainView';
import PlayingView from './views/PlayingView';

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo400,
  }
});

const mapStateToProps = state => ({
  page: state.page,
  songs: state.songs,
  playState: state.playState,
  repeat: state.common.repeat,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: id => dispatch(playSong(id)),
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.playState !== this.props.playState) {
      if (!nextProps.playState.playing) {
        console.log("Is playing, pause")
        // PAUSE
        this.audioPlayer.pause()
      } else if (nextProps.playState.songId === null) {
        console.log("Just initailized")
        this.playSong(0)        
      } else if (nextProps.playState.songId === this.props.playState.songId) {
        // RESUME
        console.log("Is paused, play")
        this.audioPlayer.play()
        // Start playing
      } else {
        console.log("Play a new song")
        this.playSong(nextProps.playState.songId)
      }
    }
  }

  componentDidMount() {
    const { songs } = this.props
    if (songs[0]) {
      this.audioPlayer.src = URL.createObjectURL(songs[0])
    }
  }

  playNext = () => {
    const { songs, playState } = this.props
    URL.revokeObjectURL(songs[playState.songId])
    let nextSongId = (playState.songId + 1) % songs.length
    this.props.playSong(nextSongId)
  }

  songEnded = () => {
    const { songs, playState, repeat } = this.props
    // No repeat
    if (repeat === 0) {
      URL.revokeObjectURL(songs[playState.songId])
      playState.songId < songs.length && this.props.playSong(playState.songId + 1)
    }
    // repeat 1
    else if (repeat === 1) this.props.playSong(playState.songId)
    // repeat all
    else this.playNext()
  }
  
  playPrevious = () => {
    const { songs, playState } = this.props
    URL.revokeObjectURL(songs[playState.songId])
    let nextSongId = playState.songId === 0 ? songs.length - 1 : playState.songId + 1//(playState.songId + ((songs.length - 1)) % songs.length
    this.props.playSong(nextSongId)
  }

  updateTime = () => {
    const currentTime = 100 * this.audioPlayer.currentTime / this.audioPlayer.duration
    this.setState({ currentTime })
  }

  playSong = (id) => {
    const { songs } = this.props
    if (songs[id]) {
      console.log("Song %s exists", songs[id])
      let fileSrc = URL.createObjectURL(songs[id])
      this.audioPlayer.src = fileSrc
      this.audioPlayer.play()
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <audio controls hidden onTimeUpdate={this.updateTime} onEnded={this.songEnded} ref={(audio) => this.audioPlayer = audio} />        
          {
            this.props.page === NOW_PLAYING_PAGE ?
             <PlayingView playNext={ this.playNext } playPrevious={ this.playPrevious } currentTime={ this.state.currentTime } /> :
             <MainView playNext={ this.playNext } playPrevious={ this.playPrevious } currentTime={ this.state.currentTime }  />
          }
        </div>
      </MuiThemeProvider>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
