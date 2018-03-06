import React from 'react';
import Avatar from 'material-ui/Avatar'
// import { ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'
import AVPauseCirleOutline from 'material-ui/svg-icons/av/pause-circle-outline'
import ImageMusicNote from 'material-ui/svg-icons/image/music-note'
// import AVSkipNext from 'material-ui/svg-icons/av/skip-next'
// import AVSkipPrevious from 'material-ui/svg-icons/av/skip-previous'


const NowPlaying = props => {
  const { playState, song, currentTime, togglePlaying, openNowPlaying } = props
  const button = playState.playing ? <AVPauseCirleOutline /> : <AvPlayCircleFilled />
  return (
    <Paper onClick={ openNowPlaying } className="small-now-playing" zDepth={5} rounded={false}>
      <LinearProgress className="song-progress" mode="determinate" min={0} max={100} value={currentTime} />
      <div style={{ display: "flex", padding: "20px 10px" }} className="now-playing-container">
        <div style={{ width: "15%" }}>
          <Avatar icon={<ImageMusicNote />} />
        </div>
        <div className="song-title">
          {song && song.name}
        </div>
        <div className="play-pause-button">
          <IconButton onClick={togglePlaying} >{button}</IconButton>
        </div>
      </div>
      {/* <ListItem
          style={listItemStyle}
          leftIcon={<Avatar icon={<ImageMusicNote/>}/>}
          rightIconButton={
            <div style={{ height: "100%" }}>
              <IconButton onClick={this.props.playPrevious} ><AVSkipPrevious/></IconButton>
              <IconButton onClick={this.props.togglePlaying} >{button}</IconButton>
              <IconButton onClick={this.props.playNext} ><AVSkipNext/></IconButton>
            </div>}
          primaryText= { songs[playState.song] && songs[playState.song].name }
        /> */}
    </Paper>
  )
}

export default NowPlaying;