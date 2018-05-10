import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import AddSongs from '../components/AddSongs';
import Header from '../components/Header'
import SongList from '../components/SongList'
import NowPlaying from '../components/NowPlaying'
import { togglePlaying, nowPlayingPage } from "../actions";

const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  openNowPlaying: () => dispatch(nowPlayingPage())
})

class MainView extends Component {
  render() {
    let { songs, playState, openNowPlaying, currentTime } = this.props
    return (
      <div>
        <Header />
        <SongList songs={songs} />
        <AddSongs />
        <NowPlaying
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
  currentTime: propTypes.number.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)