import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import { repeat, togglePlaying } from '../actions';

const mapStateToProps = state => ({
  playState: state.playState,
  repeatType: state.common.repeat,
});

const mapDispatchToProps = dispatch => ({
  changeRepeat: id => dispatch(repeat(id)),
  togglePlaying: () => dispatch(togglePlaying()),
});

class PlayingCtrl extends Component {
  changeRepeat = () => {
    const repeat = this.props.repeatType;
    const nextRepeat = repeat === 2 ? 0 : repeat + 1;
    this.props.changeRepeat(nextRepeat);
  }

  render() {
    const {
      playState, song, playNext, playPrevious, currentTime, repeatType, togglePlaying, timeDrag,
    } = this.props;
    const button = playState.playing ? 'pause_circle_filled' : 'play_circle_filled';
    const repeatButton = repeatType === 0
      ? (<FontIcon onClick={this.changeRepeat} style={{ color: 'rgba(0, 0, 0, 0.3)' }} className="material-icons">repeat</FontIcon>)
      : (<IconButton><FontIcon onClick={this.changeRepeat} className="material-icons">{ repeatType === 1 ? 'repeat_one' : 'repeat' }</FontIcon></IconButton>);

    return (
      <Paper className="play-control" zDepth={0} rounded={false}>
        <h3 className="song-title">{ song.name }</h3>
        <Slider style={{ height: '2px' }} className="song-progress" value={currentTime} onChange={(_, newVal) => timeDrag(newVal)} max={100} min={0} defaultValue={2} />
        <div className="now-playing-container">
          <div style={{ width: '35%', textAlign: 'center' }} className="side-icons">
            { repeatButton }
            <IconButton><FontIcon onClick={playPrevious} className="material-icons">skip_previous</FontIcon></IconButton>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }} className="play-pause-button">
            <IconButton><FontIcon onClick={togglePlaying} style={{ fontSize: '50px', width: '50px' }} className="material-icons">{ button }</FontIcon></IconButton>
          </div>
          <div style={{ width: '35%', textAlign: 'center' }} className="side-icons">
            <IconButton><FontIcon onClick={playNext} className="material-icons">skip_next</FontIcon></IconButton>
            <FontIcon onClick={this.props.openSnackbar} style={{ color: 'rgba(0, 0, 0, 0.3)' }} className="material-icons">shuffle</FontIcon>
          </div>
        </div>
      </Paper>
    );
  }
}

PlayingCtrl.propTypes = {
  currentTime: propTypes.number.isRequired,
  timeDrag: propTypes.func.isRequired,
  song: propTypes.object.isRequired,
  playNext: propTypes.func.isRequired,
  playPrevious: propTypes.func.isRequired,
  repeatType: propTypes.number.isRequired,
  playState: propTypes.object.isRequired,
  changeRepeat: propTypes.func.isRequired,
  togglePlaying: propTypes.func.isRequired,
  openSnackbar: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayingCtrl);
