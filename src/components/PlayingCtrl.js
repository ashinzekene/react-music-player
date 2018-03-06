import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { playSong, repeat } from '../actions';
import Avatar from 'material-ui/Avatar'
// import { ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  playSong: id => dispatch(playSong(id)),
  repeat: id => dispatch(repeat(id)),
})

const PlayingCtrl = props => {
  const { playState, song, currentTime, togglePlaying } = props
  const button = playState.playing ?  "play_circle_filled" : "pause_circle_filled"
  return (
    <Paper className="play-control" zDepth={5} rounded={false}>
      <h3 className="song-title">{ song.name }</h3>
      <LinearProgress className="song-progress" mode="determinate" min={0} max={100} value={currentTime} />
      <div style={{ display: "flex", padding: "20px 10px" }} className="now-playing-container">
        <div style={{ width: "35%", textAlign: "center" }} className="side-icons">
          <FontIcon className="material-icons">repeat</FontIcon>
          <FontIcon className="material-icons">skip_previous</FontIcon>
        </div>
        <div style={{ width: "30%", textAlign: "center" }} className="play-pause-button">
          <FontIcon style={{ fontSize: "50px", width: "50px" }} className="material-icons">{ button }</FontIcon>
        </div>
        <div style={{ width: "35%", textAlign: "center" }} className="side-icons">
          <FontIcon className="material-icons">skip_next</FontIcon>
          <FontIcon className="material-icons">shuffle</FontIcon>
        </div>
      </div>
    </Paper>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingCtrl);