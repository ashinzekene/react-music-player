import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { NOW_PLAYING_PAGE, togglePlaying, playSong } from './actions';

import MainView from './views/MainView';
import Header from './components/Header';
import PlayingView from './views/PlayingView';
import keyboardEvents from './utils/keyboardEvents';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo400,
  },
});

const mapStateToProps = state => ({
  page: state.page,
  songs: state.songs,
  playState: state.playState,
  repeatType: state.common.repeat,
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: id => dispatch(playSong(id)),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      snackBarOpen: false,
      hasRejectedInstall: false,
      snackMsg: '',
      hideSnackAction: false,
      installEvent: null,
      addToHomeScreenUIVisible: false,
    };
  }

  componentDidMount() {
    const { songs, toggle } = this.props;
    if (songs[0]) {
      this.audioPlayer.src = URL.createObjectURL(songs[0]);
    }
    this.releaseKeyboardEvents = keyboardEvents({
      playNext: this.playNext,
      playPrevious: this.playPrevious,
      togglePlaying: toggle,
    });
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      console.log('before install fired', e);
      // Stash the event so it can be triggered later.
      this.setState({ installEvent: e, addToHomeScreenUIVisible: true });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { playState } = this.props;
    const { installEvent, hasRejectedInstall } = this.state;
    if (nextProps.playState !== playState) {
      if (!nextProps.playState.playing) {
        // PAUSE
        this.audioPlayer.pause();
      } else if (nextProps.playState.songId === 0) {
        this.playSong(0);
      } else if (nextProps.playState.songId === playState.songId) {
        // RESUME
        this.audioPlayer.play();
        // Start playing
      } else {
        this.playSong(nextProps.playState.songId);
      }
      if (installEvent && !hasRejectedInstall) {
        installEvent.prompt();
        installEvent.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
            this.setState({
              snackBarOpen: true, hideSnackAction: true, snackMsg: '🤗 Yay! You\'ve installed the app',
            });
          } else {
            console.log('User dismissed the A2HS prompt');
            this.setState({
              snackBarOpen: true,
              hideSnackAction: true,
              hasRejectedInstall: true,
              snackMsg: '😥 Reload the page whenever you change your mind',
            });
          }
          this.snackBarOpen({ installEvent: null });
        });
      }
    }
  }

  componentWillUnmount() {
    this.releaseKeyboardEvents();
  }

  playNext = () => {
    const { songs, playState, playSong: play } = this.props;
    URL.revokeObjectURL(songs[playState.songId]);
    const nextSongId = (playState.songId + 1) % songs.length;
    play(nextSongId);
  }

  songEnded = () => {
    const {
      songs, playState, repeatType, playSong: play,
    } = this.props;
    // No repeat
    if (repeatType === 0) {
      URL.revokeObjectURL(songs[playState.songId]);
      if (playState.songId < songs.length) play(playState.songId + 1);
    } else if (repeatType === 1) {
      // repeat one
      play(playState.songId);
    // repeat all
    } else this.playNext();
  }

  playPrevious = () => {
    const { songs, playState, playSong: play } = this.props;
    URL.revokeObjectURL(songs[playState.songId]);
    const prevSongId = playState.songId === 0 ? songs.length - 1 : playState.songId - 1;
    play(prevSongId);
  }

  updateTime = () => {
    const currentTime = 100 * this.audioPlayer.currentTime / this.audioPlayer.duration || 0;
    this.setState({ currentTime });
  }

  playSong = (id) => {
    const { songs } = this.props;
    if (songs[id]) {
      const fileSrc = URL.createObjectURL(songs[id]);
      this.audioPlayer.src = fileSrc;
      this.audioPlayer.play();
      window.document.title = songs[id].name.replace('.mp3', '');
    }
  }

  timeDrag = (time) => {
    this.audioPlayer.currentTime = this.audioPlayer.duration * (time / 100);
  }

  handleActionClick = () => {
    window.open('https://github.com/ashinzekene/react-music-player', '_blank');
  }

  handleRequestClose = () => {
    this.setState({ snackBarOpen: false, snackMsg: '', hideSnackAction: false });
  }

  render() {
    const {
      currentTime, snackBarOpen, snackMsg, installEvent, addToHomeScreenUIVisible, hideSnackAction,
    } = this.state;
    const {
      songs, playState, openNowPlaying, toggle, repeatType, page,
    } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header
            playState={playState}
            addToHomeScreenUIVisible={addToHomeScreenUIVisible}
            playingSong={songs[playState.songId]}
            openSnackbar={() => this.setState({ snackBarOpen: true })}
          />
          <audio
            hidden
            controls
            onEnded={this.songEnded}
            onTimeUpdate={this.updateTime}
            ref={(audio) => { this.audioPlayer = audio; }}
          >
            <track kind="captions" {...{}} />
          </audio>
          {
            page === NOW_PLAYING_PAGE ? (
              <PlayingView
                repeatType={repeatType}
                playNext={this.playNext}
                timeDrag={this.timeDrag}
                installEvent={installEvent}
                currentTime={currentTime}
                playPrevious={this.playPrevious}
                playingSong={songs[playState.songId]}
                openSnackbar={msg => this.setState({ snackBarOpen: true, snackMsg: msg })}
              />) : (
                <MainView
                  songs={songs}
                  toggle={toggle}
                  playState={playState}
                  currentTime={currentTime}
                  openNowPlaying={openNowPlaying}
                  openSnackbar={msg => this.setState({ snackBarOpen: true, snackMsg: msg })}
                />)
          }
          <Snackbar
            open={snackBarOpen}
            action={!hideSnackAction && 'make a PR 😊'}
            autoHideDuration={4000}
            onActionClick={this.handleActionClick}
            onRequestClose={this.handleRequestClose}
            message={snackMsg || 'Not Implemented yet, You can make a PR 😊'}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  page: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.any).isRequired,
  playState: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    songId: PropTypes.number.isRequired,
  }).isRequired,
  repeatType: PropTypes.oneOf([0, 1, 2]).isRequired,
  toggle: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
