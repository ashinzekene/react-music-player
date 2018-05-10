import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400, } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux';
import { NOW_PLAYING_PAGE, togglePlaying, playSong } from "./actions";

import Snackbar from 'material-ui/Snackbar';
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
  repeatType: state.common.repeat,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: id => dispatch(playSong(id)),
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      snackBarOpen: false,      
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.playState !== this.props.playState) {
      if (!nextProps.playState.playing) {
        // PAUSE
        this.audioPlayer.pause()
      } else if (nextProps.playState.songId === null) {
        this.playSong(0)        
      } else if (nextProps.playState.songId === this.props.playState.songId) {
        // RESUME
        this.audioPlayer.play()
        // Start playing
      } else {
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
    const { songs, playState, repeatType } = this.props
    // No repeat
    if (repeatType === 0) {
      URL.revokeObjectURL(songs[playState.songId])
      playState.songId < songs.length && this.props.playSong(playState.songId + 1)
    }
    // repeat 1
    else if (repeatType === 1) this.props.playSong(playState.songId)
    // repeat all
    else this.playNext()
  }
  
  playPrevious = () => {
    const { songs, playState } = this.props
    URL.revokeObjectURL(songs[playState.songId])
    let nextSongId = playState.songId === 0 ? songs.length - 1 : playState.songId - 1
    console.log("Next song", nextSongId)
    this.props.playSong(nextSongId)
  }

  updateTime = () => {
    const currentTime = 100 * this.audioPlayer.currentTime / this.audioPlayer.duration
    this.setState({ currentTime })
  }

  playSong = (id) => {
    const { songs } = this.props
    if (songs[id]) {
      let fileSrc = URL.createObjectURL(songs[id])
      this.audioPlayer.src = fileSrc
      this.audioPlayer.play()
      window.document.title = songs[id].name.replace(".mp3", "")
    }
  }

  timeDrag = time => {
    this.audioPlayer.currentTime = this.audioPlayer.duration * (time / 100)
  }

  handleActionClick = () => {
    window.open("https://github.com/ashinzekene/react-music-player", "_blank")
  }

  handleRequestClose = () => {
    this.setState({ snackBarOpen: false })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <audio controls hidden onTimeUpdate={this.updateTime} onEnded={this.songEnded} ref={(audio) => this.audioPlayer = audio} />        
          {
            this.props.page === NOW_PLAYING_PAGE ?
            <PlayingView
              playNext={ this.playNext }
              timeDrag={ this.timeDrag }
              playPrevious={ this.playPrevious }
              currentTime={ this.state.currentTime }
              playingSong={this.props.songs[this.props.playState.songId]}
              repeatType={this.props.repeatType}
              openSnackbar={ () => this.setState({ snackBarOpen: true }) }
            /> :
            <MainView
              currentTime={ this.state.currentTime }
              openSnackbar={ () => this.setState({ snackBarOpen: true }) }
            />
          }
           <Snackbar
            open={this.state.snackBarOpen}
            message="Not Implemented yet, You can make a PR"
            action="make a PR"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            onActionClick={this.handleActionClick}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
