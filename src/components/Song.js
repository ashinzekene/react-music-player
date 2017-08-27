import React from 'react';
import { ListItem } from 'material-ui/List'
import ImageMusicNote from 'material-ui/svg-icons/image/music-note'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import Avatar from 'material-ui/Avatar'

import { removeSong } from '../actions'
import { connect } from 'react-redux'

class Song extends React.Component {
  handleClick = () => {
    this.props.playSong(this.props.index)
  }
  removeSong = () => {
    console.log(this.props.index)
    this.props.removeSong(this.props.index)
  }
  render() {
    return (
      <ListItem
        onClick={this.handleClick}
        leftAvatar={<Avatar icon={<ImageMusicNote />} />}
        primaryText={this.props.song.name}
        rightIconButton={<ActionDelete onClick={this.removeSong} />}
      />
    )
  }
}

const mapStateToDispatch = (dispatch) => ({
  removeSong: (id) => dispatch(removeSong(id)),
})

export default connect(null,mapStateToDispatch)(Song)
