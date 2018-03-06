import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddSongs from '../components/AddSongs';
import Header from '../components/Header'
import SongList from '../components/SongList'
import NowPlaying from '../components/NowPlaying'
import { togglePlaying, playSong } from "../actions";

const mapStateToProps = (state) => ({
  songs: state.songs,
  playState: state.playState,
  shuffle: state.common.shuffle,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: id => dispatch(playSong(id))
})

class MainView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playState !== this.props.playState) {
      if (!nextProps.playState.playing) {
        // PAUSE
        this.audioPlayer.pause()
      } else if (nextProps.playState.songId === this.props.playState.songId) {
        // RESUME
        this.audioPlayer.play()
        // Start playing
      } else {
        this.playSong(nextProps.playState.songId)

      }
    }
  }

  playSong = (id) => {
    const { songs } = this.props
    if (songs[id]) {
      let fileSrc = URL.createObjectURL(songs[id])
      this.audioPlayer.src = fileSrc
      this.audioPlayer.play()
    }
  }

  songEnded = () => {
    const { songs, playState, shuffle } = this.props
    // No shuffle
    if (shuffle === 0) {
      URL.revokeObjectURL(songs[playState.songId])
      playState.songId < songs.length && this.props.playSong(playState.songId + 1)
    }
    // Shuffle 1
    else if (shuffle === 1) this.props.playSong(playState.id)
    // shuffle all
    else this.playNext()
  }

  playNext = () => {
    const { songs, playState, shuffle } = this.props
    URL.revokeObjectURL(songs[playState.songId])
    let nextSongId = (playState.songId + 1) % songs.length
    this.props.playSong(nextSongId)
  }

  playPrevious = () => {
    const { songs, playState, shuffle } = this.props
    URL.revokeObjectURL(songs[playState.songId])
    let nextSongId = playState.songId === 0 ? songs.length - 1 : playState.songId + 1//(playState.songId + ((songs.length - 1)) % songs.length
    this.props.playSong(nextSongId)
  }

  updateTime = () => {
    const currentTime = 100 * this.audioPlayer.currentTime / this.audioPlayer.duration
    this.setState({ currentTime })
  }

  render() {
    let { currentTime } = this.state
    let { songs, playState } = this.props
    return (
      <div>
        <Header />
        <SongList songs={songs} />
        <AddSongs />
        <audio controls hidden onTimeUpdate={this.updateTime} onEnded={this.songEnded} ref={(audio) => this.audioPlayer = audio} />
        <NowPlaying togglePlaying={this.props.toggle} playState={playState} playNext={this.playNext} song={songs[playState.songId]} currentTime={currentTime} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)