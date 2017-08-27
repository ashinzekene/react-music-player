import React from 'react';
import AddSongs from './AddSongs' 
import MyAppBar from './MyAppBar' 
import SongList from './SongList'
import NowPlaying from './NowPlaying'
import { connect } from 'react-redux'

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs:[],
      nowPlaying: 0,
      isPlaying: false,
    }
    this.togglePlaying = this.togglePlaying.bind(this)
    this.play = this.play.bind(this)
    this.playNext = this.playNext.bind(this)
  }
  togglePlaying() {
    this.audioPlayer.paused? this.audioPlayer.play() : this.audioPlayer.pause()
  }
  play(index) {
    console.log("PLAYING", index)
    if (this.props.songs[index]) {
      var file = new FileReader()
      file.readAsDataURL(this.props.songs[index])
      file.onload = (e) => {
        this.audioPlayer.src = e.target.result
        this.audioPlayer.play()
        this.setState({isPlaying: true})
        this.setState({nowPlaying: index})
      }
    }
  }
  playNext() {
    this.play(this.state.nowPlaying + 1)
  }
  render() {
    const song = this.props.songs[this.state.nowPlaying] ? this.props.songs[this.state.nowPlaying].name: "No song playing"
    return (
      <div>
        <MyAppBar/>
        <SongList songs={this.props.songs} playSong={this.play} />
        <AddSongs addSongs={this.addSongs } /> 
        <audio controls hidden onEnded={this.playNext} ref={(audio)=> this.audioPlayer =audio} />
        <NowPlaying togglePlaying= { this.togglePlaying } nowPlaying={song} />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  songs: state.songs
})


export default connect(mapStateToProps)(MusicPlayer)