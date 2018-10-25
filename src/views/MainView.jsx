import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import AddSongs from '../components/AddSongs';
import SongList from '../components/SongList';
import NowPlaying from '../components/NowPlaying';
import { togglePlaying, nowPlayingPage } from '../actions';

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  openNowPlaying: () => dispatch(nowPlayingPage()),
});

const MainView = ({
  songs, playState, openNowPlaying, openSnackbar, currentTime, toggle,
}) => (
  <div>
    <SongList openSnackbar={openSnackbar} songs={songs} />
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

MainView.propTypes = {
  openNowPlaying: propTypes.func.isRequired,
  toggle: propTypes.func.isRequired,
  songs: propTypes.arrayOf(propTypes.any).isRequired,
  playState: propTypes.objectOf(propTypes.any).isRequired,
  currentTime: propTypes.number.isRequired,
  openSnackbar: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MainView);
