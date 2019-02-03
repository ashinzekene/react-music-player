import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSongs } from '../actions';

const mapDispatchToProps = dispatch => ({
  addSongs: songs => dispatch(addSongs(songs)),
});

class AddSongs extends Component {
  addSong = (e) => {
    const { addSongs: add } = this.props;
    add(e.currentTarget.files);
  }

  render() {
    return (
      <Fab
        color="primary"
        aria-label="Add"
        component="label"
        htmlFor="song-input"
        style={{
          position: 'fixed', bottom: '110px', right: '25px', zIndex: 3000,
        }}
      >
        <input
          style={{ display: 'none' }}
          id="song-input"
          onChange={this.addSong}
          type="file"
          multiple
          accept="audio/mp3"
        />
        <AddIcon />
      </Fab>
    );
  }
}

AddSongs.propTypes = {
  addSongs: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddSongs);
