import React from 'react';
import propTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

import Paper from '@material-ui/core/Paper';
import PauseIcon from '@material-ui/icons/Pause';
import MusicNote from '@material-ui/icons/MusicNote';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import Avatar from '@material-ui/core/Avatar';

const NowPlaying = ({
  playState, playingSong, currentTime, togglePlaying, openNowPlaying,
}) => {
  const handleClick = (e) => {
    if (!e.target.closest('[type="button"]') && playingSong) {
      openNowPlaying();
    }
  };

  return (
    <Paper className="small-now-playing" onClick={handleClick}>
      <LinearProgress variant="determinate" value={currentTime} />
      <div className="now-playing-container">
        <Avatar>
          <MusicNote />
        </Avatar>
        <div className="song-name">
          {playingSong ? playingSong.name : '[No song]'}
        </div>
        <button type="button" onClick={togglePlaying}>
          { playState.playing ? <PauseIcon /> : <PlayIcon /> }
        </button>
      </div>
    </Paper>
  );
};

NowPlaying.defaultProps = {
  playingSong: null,
};

NowPlaying.propTypes = {
  playState: propTypes.objectOf(propTypes.any).isRequired,
  playingSong: propTypes.objectOf(propTypes.any),
  currentTime: propTypes.number.isRequired,
  togglePlaying: propTypes.func.isRequired,
  openNowPlaying: propTypes.func.isRequired,
};

export default NowPlaying;
