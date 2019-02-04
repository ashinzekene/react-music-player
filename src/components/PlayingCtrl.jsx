import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import Paper from '@material-ui/core/Paper';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import SkipNext from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Repeat from '@material-ui/icons/Repeat';
import RepeatOne from '@material-ui/icons/RepeatOne';
import { repeatType, togglePlaying } from '../actions';

const mapStateToProps = state => ({
  playState: state.playState,
  repeatType: state.common.repeat,
});

const mapDispatchToProps = dispatch => ({
  changeRepeat: id => dispatch(repeatType(id)),
  togglePlaying: () => dispatch(togglePlaying()),
});

class PlayingCtrl extends Component {
  componentDidMount() {
    const { installEvent } = this.props;
    setTimeout(() => typeof installEvent === 'function' && installEvent(), 3000);
  }

  changeRepeat = () => {
    const { repeatType: repeat, changeRepeat } = this.props;
    const nextRepeat = repeat === 2 ? 0 : repeat + 1;
    changeRepeat(nextRepeat);
  }

  render() {
    const {
      playState, song, playNext, playPrevious, currentTime, repeatType: repeat,
      togglePlaying: toggle, timeDrag, openSnackbar,
    } = this.props;

    return (
      <Paper className="play-control">
        <h3 className="song-title">{ song.name }</h3>
        <Slider style={{ height: '2px' }} className="song-progress" value={currentTime} onChange={(_, newVal) => timeDrag(newVal)} max={100} min={0} defaultValue={2} />
        <div className="now-playing-container">
          <div style={{ width: '35%', textAlign: 'center' }} className="side-icons">
            <IconButton onClick={this.changeRepeat}>
              { repeat === 1
                ? <RepeatOne /> : <Repeat style={repeat === 2 ? {} : { opacity: 0.5 }} />
              }
            </IconButton>
            <IconButton onClick={playPrevious}>
              <SkipPrevious />
            </IconButton>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }} className="play-pause-button">
            <IconButton onClick={toggle}>
              { playState.playing ? <PauseIcon /> : <PlayIcon /> }
            </IconButton>
          </div>
          <div style={{ width: '35%', textAlign: 'center' }} className="side-icons">
            <IconButton onClick={playNext}>
              <SkipNext />
            </IconButton>
            <ShuffleIcon
              className="material-icons"
              style={{ color: 'rgba(0, 0, 0, 0.3)' }}
              onClick={() => openSnackbar('Shuffle doesn\'t work yet, You can make a PR 😊')}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

PlayingCtrl.defaultProps = {
  installEvent: null,
};

PlayingCtrl.propTypes = {
  timeDrag: propTypes.func.isRequired,
  playNext: propTypes.func.isRequired,
  playPrevious: propTypes.func.isRequired,
  openSnackbar: propTypes.func.isRequired,
  repeatType: propTypes.number.isRequired,
  changeRepeat: propTypes.func.isRequired,
  currentTime: propTypes.number.isRequired,
  togglePlaying: propTypes.func.isRequired,
  song: propTypes.objectOf(propTypes.any).isRequired,
  playState: propTypes.objectOf(propTypes.any).isRequired,
  installEvent: propTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayingCtrl);
