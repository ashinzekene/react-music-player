import React from 'react';
import Avatar from 'material-ui/Avatar'
// import { ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';
// import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'
// import AVPauseCirleOutline from 'material-ui/svg-icons/av/pause-circle-outline'
// import ImageMusicNote from 'material-ui/svg-icons/image/music-note'
// import AVSkipNext from 'material-ui/svg-icons/av/skip-next'
// import AVSkipPrevious from 'material-ui/svg-icons/av/skip-previous'


const PlayingCtrl = props => {
  const { playState, song, currentTime, togglePlaying } = props
  const button = playState.playing ?  "play_circle_filled" : "pause_circle_filled"
  return (
    <Paper className="play-control" zDepth={5} rounded={false}>
      <h3 className="song-title">{ song.name }</h3>
      <LinearProgress className="song-progress" mode="determinate" min={0} max={100} value={currentTime} />
      <div style={{ display: "flex", padding: "20px 10px" }} className="now-playing-container">
        <div style={{ width: "35%", textAlign: "center" }} className="side-icons">
          {/* <IconButton onClick={props.playPrevious} ><AVSkipPrevious/></IconButton> */}
          <FontIcon className="material-icons">repeat</FontIcon>
          <FontIcon className="material-icons">skip_previous</FontIcon>
        </div>
        <div style={{ width: "30%", textAlign: "center" }} className="play-pause-button">
          <FontIcon style={{ fontSize: "50px", width: "50px" }} className="material-icons">{ button }</FontIcon>
          {/* <IconButton onClick={togglePlaying} >{button}</IconButton> */}
        </div>
        <div style={{ width: "35%", textAlign: "center" }} className="side-icons">
          <FontIcon className="material-icons">skip_next</FontIcon>
          {/* <IconButton onClick={props.playNext} ><AVSkipNext/></IconButton> */}
          <FontIcon className="material-icons">shuffle</FontIcon>
        </div>
      </div>
      {/* <ListItem
          style={listItemStyle}
          leftIcon={<Avatar icon={<ImageMusicNote/>}/>}
          rightIconButton={
            <div style={{ height: "100%" }}>
              <IconButton onClick={props.togglePlaying} >{button}</IconButton>
            </div>}
          primaryText= { songs[playState.song] && songs[playState.song].name }
        /> */}
    </Paper>
  )
}

export default PlayingCtrl;