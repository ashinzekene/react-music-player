import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import AddSongs from '../components/AddSongs';
import Header from '../components/Header'
import SongList from '../components/SongList'
import NowPlaying from '../components/NowPlaying'
import { togglePlaying, nowPlayingPage, addSongs } from "../actions";

const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  openNowPlaying: () => dispatch(nowPlayingPage()),
  addSongs: (songs) => dispatch(addSongs(songs))
})

class MainView extends Component {
  handleDragOver = event => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  };

  render() {
    let { songs, playState, openNowPlaying, openSnackbar, currentTime } = this.props
    return (
      <div
        style={{height: "100%"}}
        onDragOver={this.handleDragOver}
        onDrop={event => {
          this.handleDragOver(event);
          if (window.File && window.FileReader && window.FileList && window.Blob) {
            var files = [...event.dataTransfer.files];
            files = files.filter(file => file.name && file.name.endsWith(".mp3"));
            files.length > 0 && this.props.addSongs(files);
          } else {
            console.log('The File APIs are not fully supported in this browser.');
          }
          return false;          
        }}>
        <Header 
          openSnackbar={openSnackbar}
          playingSong={songs[playState.songId]}
          />
        <SongList openSnackbar={openSnackbar} songs={songs} />
        <AddSongs />
        <NowPlaying
          openSnackbar={openSnackbar}
          togglePlaying={this.props.toggle}
          playState={playState}
          playingSong={songs[playState.songId]}
          openNowPlaying={ openNowPlaying }
          currentTime={currentTime} />
      </div>
    )
  }
}

MainView.propTypes = {
  openNowPlaying: propTypes.func.isRequired,
  toggle: propTypes.func.isRequired,
  songs: propTypes.array.isRequired,
  playState: propTypes.object.isRequired,
  currentTime: propTypes.number.isRequired,
  openSnackbar: propTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)