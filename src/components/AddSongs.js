import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class AddSongs extends React.Component {
  constructor(props) {
    super(props)
    this.addSong = this.addSong.bind(this)
  }
  addSong() {
    this.fileInput.click()
    this.fileInput.onchange = (e)=> {
      this.props.addSongs(this.fileInput.files)
    }
  }
  render() {
    return (
      <FloatingActionButton onClick={ this.addSong } backgroundColor="#7050FA" style={{position: "fixed", bottom: "100px", right: "40px", zIndex:3000}} >
        <ContentAdd /> 
        <input ref={(input)=> this.fileInput = input} type="file" multiple accept="audio/mp3" />
      </FloatingActionButton>
    )
  }
}