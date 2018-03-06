import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';

import Header from '../components/Header';
import PlayingCtrl from '../components/PlayingCtrl';
import { togglePlaying, playSong, repeat } from "../actions";


const mapStateToProps = state => ({
  songs: state.songs,
  playState: state.playState,
  repeat: state.common.repeat,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: id => dispatch(playSong(id)),
  repeat: id => dispatch(repeat(id)), 
})


class PlayingView extends Component {

  playNext = () => {
    const { songs, playState } = this.props
    URL.revokeObjectURL(songs[playState.songId])
    let nextSongId = (playState.songId + 1) % songs.length
    this.props.playSong(nextSongId)
  }
  
  playPrevious = () => {
    const { songs, playState } = this.props
    URL.revokeObjectURL(songs[playState.songId])
    let nextSongId = playState.songId === 0 ? songs.length - 1 : playState.songId + 1//(playState.songId + ((songs.length - 1)) % songs.length
    this.props.playSong(nextSongId)
  }

  repeat = () => {
    let repeat = this.props.repeat
    let nextRepeat = repeat === 2 ? 0 : ++repeat
    this.props.repeat(nextRepeat)
  }
  
  render() {
    const { songs, playState, repeat, currentTime } = this.props
    return (
      <div>
        <Header/>
        <div style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
          <FontIcon className="material-icons" style={{ width: "300px", fontSize: "300px", color: "rgba(0,0,0,0.3)" }}>album</FontIcon>
        </div>
        <PlayingCtrl
          currentTime= { currentTime }
          song={ songs[playState.songId] }
          playNext={ this.playNext }
          playPrevious= { this.playPrevious }
          repeat={ repeat }
          toggle={ this.props.toggle() }
          changeRepeat={ this.repeat }
          playState={ playState } />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingView);