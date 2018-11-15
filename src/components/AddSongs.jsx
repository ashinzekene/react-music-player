import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PropTypes from 'prop-types';
import getMetaData from '../utils/metadata';

class AddSongs extends React.Component {
  triggerInput = () => {
    this.fileInput.click();
  }

  addSong = async e => {
    const { addSongs: add } = this.props;
    const files = [...e.currentTarget.files];
    add(await Promise.all(files.map(getMetaData)));
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

export default AddSongs;
