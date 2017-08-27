import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { addSongs } from '../actions'
import { connect } from 'react-redux';

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
      <FloatingActionButton onClick={ this.triggerInput } backgroundColor="#7050FA" style={{position: "fixed", bottom: "100px", right: "40px", zIndex:3000}} >
        <ContentAdd /> 
        <input ref={(input)=> this.fileInput = input} onChange= {this.addSong} type="file" multiple accept="audio/mp3" />
      </FloatingActionButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addSongs: (songs) =>  dispatch(addSongs(songs)),
})

export default connect(null, mapDispatchToProps)(AddSongs)