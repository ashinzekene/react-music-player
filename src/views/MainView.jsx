import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import AddSongs from '../components/AddSongs';
import SongList from '../components/SongList';
import NowPlaying from '../components/NowPlaying';
import { togglePlaying, nowPlayingPage, addSongs } from '../actions';

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  openNowPlaying: () => dispatch(nowPlayingPage()),
  addSongs: songs => dispatch(addSongs(songs)),
});

class MainView extends Component {
  handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'copy';
  };

  render() {
    const {
      songs, playState, openNowPlaying, openSnackbar, currentTime, addSongs: add, toggle,
    } = this.props;
    return (
      <div
        onDragOver={this.handleDragOver}
        onDrop={(event) => {
          this.handleDragOver(event);
          if (window.File && window.FileReader && window.FileList && window.Blob) {
            const files = [...event.dataTransfer.files].filter(({ name }) => name && name.endsWith('.mp3'));
            if (files.length > 0) add(files);
          } else {
            openSnackbar('The File APIs are not fully supported in this browser.');
          }
          return false;
        }}
      >
        <SongList songs={songs} />
        <AddSongs />
        <NowPlaying
          togglePlaying={toggle}
          playState={playState}
          playingSong={songs[playState.songId]}
          openNowPlaying={openNowPlaying}
          currentTime={currentTime}
        />
      </div>
    );
  }
}

MainView.propTypes = {
  openNowPlaying: propTypes.func.isRequired,
  toggle: propTypes.func.isRequired,
  addSongs: propTypes.func.isRequired,
  songs: propTypes.arrayOf(propTypes.any).isRequired,
  playState: propTypes.objectOf(propTypes.any).isRequired,
  currentTime: propTypes.number.isRequired,
  openSnackbar: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MainView);
