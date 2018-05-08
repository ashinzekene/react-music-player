import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { addSongs } from '../actions'
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  addSongs: (songs) =>  dispatch(addSongs(songs)),
})


class AddSongs extends React.Component {
  constructor(props) {
    super(props)
    this.addSong = this.addSong.bind(this)
    this.triggerInput = this.triggerInput.bind(this)
  }
  triggerInput() {
    this.fileInput.click()
  }
  addSong(e) {
    this.props.addSongs(e.currentTarget.files)
  }
  render() {
    return (
      <FloatingActionButton onClick={ this.triggerInput } backgroundColor="#7050FA" style={{position: "fixed", bottom: "120px", right: "25px", zIndex:3000}} >
        <ContentAdd />
        <label htmlFor="song-input" className="sr-only">Pick a song</label>
        <input style={{ display: "none" }} id="song-input" ref={(input)=> this.fileInput = input} onChange= {this.addSong} type="file" multiple accept="audio/mp3" />
      </FloatingActionButton>
    )
  }
}

export default connect(null, mapDispatchToProps)(AddSongs)