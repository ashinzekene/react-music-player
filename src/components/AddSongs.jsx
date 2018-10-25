import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSongs } from '../actions';

const mapDispatchToProps = dispatch => ({
  addSongs: songs => dispatch(addSongs(songs)),
});


class AddSongs extends React.Component {
  constructor(props) {
    super(props);
    this.addSong = this.addSong.bind(this);
    this.triggerInput = this.triggerInput.bind(this);
  }

  triggerInput() {
    this.fileInput.click();
  }

  addSong(e) {
    const { addSongs: add } = this.props;
    add(e.currentTarget.files);
  }

  render() {
    return (
      <FloatingActionButton
        onClick={this.triggerInput}
        backgroundColor="#7050FA"
        style={{
          position: 'fixed', bottom: '120px', right: '25px', zIndex: 3000,
        }}
      >
        <span style={{ color: 'white', fontSize: '30px', fontWeight: 200 }}>+</span>
        <label htmlFor="song-input" className="sr-only">
          Pick a song
          <input
            style={{ display: 'none' }}
            id="song-input"
            ref={(input) => { this.fileInput = input; }}
            onChange={this.addSong}
            type="file"
            multiple
            accept="audio/mp3"
          />
        </label>
      </FloatingActionButton>
    );
  }
}

AddSongs.propTypes = {
  addSongs: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddSongs);
