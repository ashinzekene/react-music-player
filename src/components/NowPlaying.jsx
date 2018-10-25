import React from 'react';
import propTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';
import ImageMusicNote from 'material-ui/svg-icons/image/music-note';


const NowPlaying = (props) => {
  const {
    playState, playingSong, currentTime, togglePlaying, openNowPlaying,
  } = props;
  const button = playState.playing ? 'pause_circle_filled' : 'play_circle_filled';
  return (
    <Paper className="small-now-playing" zDepth={5} rounded={false}>
      <LinearProgress className="song-progress" mode="determinate" min={0} max={100} value={currentTime} />
      <div style={{ display: 'flex', padding: '20px 10px' }} className="now-playing-container">
        {/* eslint-disable-next-line */}
        <div style={{ width: '90%' }} role="button" tabIndex="0" onClick={playingSong && openNowPlaying}>
          <div style={{ width: '15%', display: 'inline-block' }}>
            <Avatar icon={<ImageMusicNote />} />
          </div>
          <div style={{ display: 'inline-block', width: '77%' }} className="song-title">
            {playingSong ? playingSong.name : '[No song]'}
          </div>
        </div>
        <div style={{ width: '50px' }} className="play-pause-button">
          <IconButton onClick={togglePlaying}>
            <FontIcon style={{ fontSize: '60px' }} className="material-icons">{button}</FontIcon>
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};

NowPlaying.propTypes = {
  playState: propTypes.objectOf(propTypes.any).isRequired,
  playingSong: propTypes.objectOf(propTypes.any).isRequired,
  currentTime: propTypes.number.isRequired,
  togglePlaying: propTypes.func.isRequired,
  openNowPlaying: propTypes.func.isRequired,
};

export default NowPlaying;
