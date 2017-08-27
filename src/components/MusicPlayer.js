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
      currentTime: 0,
      isPlaying: false,
    }
    this.togglePlaying = this.togglePlaying.bind(this)
    this.play = this.play.bind(this)
    this.playNext = this.playNext.bind(this)
    this.playPrevious = this.playPrevious.bind(this)
    this.loadData = this.loadData.bind(this)
  }
  togglePlaying() {
    if (this.audioPlayer.paused) {
      this.audioPlayer.play() 
      this.setState({isPlaying: true})
    } else {
      this.audioPlayer.pause()
      this.setState({isPlaying: false})
     }
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
    this.state.nowPlaying+2 >= this.props.songs.length ? this.play(0) :this.play(this.state.nowPlaying + 1)
  }
  playPrevious() {
    this.state.nowPlaying === 0 ? this.play(this.props.songs.length - 1) :this.play(this.state.nowPlaying - 1)
  }
  loadData() {
    const currentTime = 100 * this.audioPlayer.currentTime / this.audioPlayer.duration
    this.setState({currentTime})
  }
  render() {
    const paused = !this.state.isPlaying
    const song = this.props.songs[this.state.nowPlaying] ? this.props.songs[this.state.nowPlaying].name: "No song playing"
    return (
      <div>
        <MyAppBar/>
        <SongList songs={this.props.songs} playSong={this.play} />
        <AddSongs addSongs={this.addSongs } /> 
        <audio controls hidden onTimeUpdate={ this.loadData } onEnded={this.playNext} ref={(audio)=> this.audioPlayer =audio} />
        <NowPlaying 
          togglePlaying= { this.togglePlaying } 
          playNext= { this.playNext } 
          isPlaying = { paused }
          playPrevious= { this.playPrevious }
          currentTime = { this.state.currentTime }
          nowPlaying={song} />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  songs: state.songs
})


export default connect(mapStateToProps)(MusicPlayer)