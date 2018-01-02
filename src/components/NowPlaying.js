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
import { connect } from "react-redux";
import { togglePlaying, playPrevious, playNext } from '../actions/index';

const mapDispatchToProps = dispatch => ({
  playNext: () => dispatch(playNext()),
  playPrevious: () => dispatch(playPrevious()),
  togglePlaying: ()=> dispatch(togglePlaying()),
})


class NowPlaying extends React.Component {
  render() {
    const { playState, songs, currentTime } = this.props
    console.log(currentTime) 
    const button = playState.playing ? <AVPauseCirleOutline /> : <AvPlayCircleFilled/> 
    return (
      <Paper style={{backgroundColor: "white", zIndex: "4000", position: "fixed", bottom: "0px", left: "0px", width: "100%", height: "100px"}} zDepth={5} rounded={false}>
        <LinearProgress style={{margin:"5px 20px"}} mode="determinate" min={0} max={100} value={this.props.currentTime} />
        <ListItem
          leftIcon={<Avatar icon={<ImageMusicNote/>}/>}
          rightIconButton={
            <div>
              <IconButton onClick={this.props.playPrevious} ><AVSkipPrevious/></IconButton>
              <IconButton onClick={this.props.togglePlaying} >{button}</IconButton>
              <IconButton onClick={this.props.playNext} ><AVSkipNext/></IconButton>
            </div>}
          primaryText= { songs[playState.song] && songs[playState.song].name }
        />
      </Paper>
    )
  }
}

export default connect(null, mapDispatchToProps)(NowPlaying);