import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import AddSongs from '../components/AddSongs';
import Header from '../components/Header'
import SongList from '../components/SongList'
import NowPlaying from '../components/NowPlaying'
import { togglePlaying, playSong, nowPlayingPage } from "../actions";

const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
  repeat: state.common.repeat,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: id => dispatch(playSong(id)),
  openNowPlaying: () => dispatch(nowPlayingPage())
})

class MainView extends Component {
  render() {
    let { songs, playState, openNowPlaying, currentTime,playNext, playPrevious } = this.props
    return (
      <div>
        <Header />
        <SongList songs={songs} />
        <AddSongs />
        <NowPlaying
          togglePlaying={this.props.toggle}
          playState={playState}
          playNext={playNext}
          playPrevious={playPrevious}
          song={songs[playState.songId]}
          openNowPlaying={ openNowPlaying }
          currentTime={currentTime} />
      </div>
    )
  }
}

MainView.propTypes = {
  songs: propTypes.array.isRequired,
  playState: propTypes.object.isRequired,
  repeat: propTypes.number.isRequired,
  currentTime: propTypes.number.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)