import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import PlayingCtrl from '../components/PlayingCtrl';
import { togglePlaying, playSong } from "../actions";


const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
  shuffle: state.common.shuffle,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: id => dispatch(playSong(id))
})


class PlayingView extends Component {
  render() {
    return (
      <div>
        <Header/>
        <PlayingCtrl song={ this.props.songs[1] } playState={ this.props.playState } />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingView);