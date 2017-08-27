import React from 'react';
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'
import AVPauseCirleOutline from 'material-ui/svg-icons/av/pause-circle-outline'
import ImageMusicNote from 'material-ui/svg-icons/image/music-note'
import AVSkipNext from 'material-ui/svg-icons/av/skip-next'
import AVSkipPrevious from 'material-ui/svg-icons/av/skip-previous'

class NowPlaying extends React.Component {
  constructor(props) {
    super(props)
    this.togglePlaying = this.togglePlaying.bind(this)
    this.playNext = this.playNext.bind(this)
    this.playPrevious = this.playPrevious.bind(this)
  }
  togglePlaying() {
    this.props.togglePlaying()
  }
  playNext() {
    this.props.playNext()
  }
  playPrevious() {
    this.props.playPrevious()
  }
  render() {
    const button = this.props.isPlaying ? <AvPlayCircleFilled/> : <AVPauseCirleOutline />
    return (
      <Paper style={{backgroundColor: "white", zIndex: "4000", position: "fixed", bottom: "0px", left: "0px", width: "100%", height: "100px"}} zDepth={5} rounded={false}>
        <LinearProgress style={{margin:"5px 20px"}} mode="determinate" min={0} max={100} value={this.props.currentTime} />
        <ListItem
          leftIcon={<Avatar icon={<ImageMusicNote/>}/>}
          rightIconButton={
            <div>
              <IconButton onClick={this.playPrevious} ><AVSkipPrevious/></IconButton>
              <IconButton onClick={this.togglePlaying} >{button}</IconButton>
              <IconButton onClick={this.playNext} ><AVSkipNext/></IconButton>
            </div>}
          primaryText= {this.props.nowPlaying}
          secondaryText="Made by Ashinze Ekene"
        />
      </Paper>
    )
  }
}

export default NowPlaying