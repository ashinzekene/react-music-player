import React from 'react';
import AddSongs from './AddSongs' 
import MyAppBar from './MyAppBar' 
import SongList from './SongList'
import NowPlaying from './NowPlaying'
import { connect } from 'react-redux'
import { togglePlaying, playNext, playPrevious, playSong } from "../actions";

const mapStateToProps = (state) => ({
  songs: state.songs,
  playState: state.playState
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: () => dispatch(playSong()),
  playNext: () => dispatch(playNext()),
  playPrevious: () => dispatch(playPrevious())
})

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.playSong = this.playSong.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  playSong(index) {
    if (this.props.songs[index]) {
      this.props.playSong()
      var file = new FileReader()
      file.readAsDataURL(this.props.songs[index])
      file.onload = (e) => {
        this.audioPlayer.src = e.target.result
        this.audioPlayer.play()
      }
    }
  }

  loadData() {
    const currentTime = 100 * this.audioPlayer.currentTime / this.audioPlayer.duration
    this.setState({currentTime})
  }

  render() {
    let { isPlaying, currentTime }= !this.state
    let { playState, songs } = this.props
    return (
      <div>
        <MyAppBar/>
        <SongList songs={ songs} playSong={ this.playSong } />
        <AddSongs addSongs={this.addSongs } /> 
        <audio controls hidden onTimeUpdate={ this.loadData } onEnded={ this.props.playNext } ref={(audio)=> this.audioPlayer =audio} />
        <NowPlaying playState={ playState } currentTime={ currentTime } />
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)