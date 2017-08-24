import React from 'react';

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'

import ImageMusicNote from 'material-ui/svg-icons/image/music-note'
import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'

import AddSongs from './AddSongs' 
import MyAppBar from './MyAppBar' 
import SongList from './SongList' 

import * as LocalForage from 'localforage'
// import { songs, artists } from './songs'
// import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous'
// import AvSkipNext from 'material-ui/svg-icons/av/skip-next'


export default class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs:[],
      nowPlaying: "....",
      isPlaying: false,
    }
    this.addSongs = this.addSongs.bind(this)
    this.playSong = this.playSong.bind(this)
    this.togglePlaying = this.togglePlaying.bind(this)
    this.saveSongs = this.saveSongs.bind(this)
    this.removeSong = this.removeSong.bind(this)
  }
  componentDidMount() {
    if(LocalForage.getItem("songs")) {
      LocalForage.getItem("songs").then(val => {
        this.setState({songs: val})
      })
    }
  }
  togglePlaying() {
    this.audioPlayer.paused? this.audioPlayer.play() : this.audioPlayer.pause()
  }
  addSongs(songs) {
    this.setState(prevState => {
      return {songs: [ ...prevState.songs, ...songs]}
    })
    this.saveSongs()
  }

  playSong(songIndex) {
    var file = new FileReader()
    file.readAsDataURL(this.state.songs[songIndex])
    this.setState({nowPlaying: this.state.songs[songIndex]})
    file.onload = (e)=> {
      this.audioPlayer.src= e.target.result
      this.audioPlayer.play()
    }
  }
  removeSong(index) {
    this.setState(prevState => {
      return {songs: prevState.songs.splice(index, 1)}
    })
    this.saveSongs()
  }
  saveSongs() {
    LocalForage.setItem("songs", this.state.songs).catch(console.log)
  }
  render() {
    return (
      <div>
        <MyAppBar/>
        <SongList playSong={this.playSong } removeSong={ this.removeSong } songs={this.state.songs}/>
        <AddSongs addSongs={this.addSongs }/> 
        <PlayPaper togglePlaying= { this.togglePlaying } nowPlaying={this.state.nowPlaying} />
        <audio controls hidden ref={(audio)=> this.audioPlayer =audio} />
      </div>
    )
  }
}

const PlayPaper = (props) => {
  const togglePlaying =() => {
    props.togglePlaying()
  }
  return (
    <Paper style={{backgroundColor: "white", zIndex: "4000", position: "fixed", bottom: "0px", left: "0px", width: "100%", height: "70px"}} zDepth={5} rounded={false}>
      <ListItem
        leftIcon={<Avatar icon={<ImageMusicNote/>}/>}
        rightIconButton={<IconButton onClick={togglePlaying} ><AvPlayCircleFilled/></IconButton>}
        primaryText= {props.nowPlaying.name}
        secondaryText="Made by Ashinze Ekene"
      />
    </Paper>
  )
}
