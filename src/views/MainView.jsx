import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import id3js from 'id3js';

import AddSongs from '../components/AddSongs';
import SongList from '../components/SongList';
import NowPlaying from '../components/NowPlaying';
import { togglePlaying, nowPlayingPage, addSongs } from '../actions';

const getSongTags = song => new Promise((res, rej) => {
  id3js(song, (err, tags) => {
    if (err) {
      return rej(err);
    }
    return res(tags);
  });
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  openNowPlaying: () => dispatch(nowPlayingPage()),
  addSongs: songs => dispatch(addSongs(songs)),
});

class MainView extends Component {
  handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // eslint-disable-next-line
    event.dataTransfer.dropEffect = 'copy';
  };

  render() {
    const {
      songs, playState, openNowPlaying, openSnackbar, currentTime, addSongs: add, toggle,
    } = this.props;
    return (
      <div
        style={{ height: '100%' }}
        onDragOver={this.handleDragOver}
        onDrop={async (event) => {
          this.handleDragOver(event);
          if (window.File && window.FileReader && window.FileList && window.Blob) {
            const files = [...event.dataTransfer.files].filter(({ name }) => name && name.endsWith('.mp3'));
            console.log(await Promise.all(files.map(getSongTags)));
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
