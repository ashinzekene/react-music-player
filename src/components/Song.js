import React from 'react';
import { ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import ImageMusicNote from 'material-ui/svg-icons/image/music-note'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import Avatar from 'material-ui/Avatar'

import { removeSong, playSong } from '../actions'

const mapStateToDispatch = (dispatch) => ({
  removeSong: id => dispatch(removeSong(id)),
  playSong: id => dispatch(playSong(id))
})


class Song extends React.Component {
  handleClick = () => {
    console.log("SONG ID", this.props.index)
    this.props.playSong(this.props.index)
  }
  removeSong = () => {
    console.log(this.props.index)
    this.props.removeSong(this.props.index)
  }
  render() {
    return (
      <ListItem
      className="song"
      onClick={this.handleClick}
      leftAvatar={<Avatar icon={<ImageMusicNote />} />}
    primaryText={ <div className="song-title">{ this.props.song.name}</div> }
      rightIconButton={<ActionDelete  />}
      />
    )
  }
}
  

export default connect(null,mapStateToDispatch)(Song)
