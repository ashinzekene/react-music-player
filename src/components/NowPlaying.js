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
import { PLAY_NEXT, PLAY_PREVIOUS, TOGGLE_PLAYING } from '../actions/index';

const mapDispatchToProps = dispatch => ({
  playNext: () => dispatch({ type: PLAY_NEXT }),
  playPrevious: () => dispatch({ type: PLAY_PREVIOUS }),
  togglePlaying: ()=> dispatch({ type: TOGGLE_PLAYING }),
})


class NowPlaying extends React.Component {
  render() {
    // const { isPlaying, song } = this.props.playState ? <AvPlayCircleFilled/> : <AVPauseCirleOutline />
    const button = <AvPlayCircleFilled/>
    console.log(this.props.playState)
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
        />
      </Paper>
    )
  }
}

export default connect(null, mapDispatchToProps)(NowPlaying);