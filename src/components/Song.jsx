import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import ImageMusicNote from 'material-ui/svg-icons/image/music-note';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { removeSong, playSong } from '../actions'

const mapStateToDispatch = (dispatch) => ({
  removeSong: id => dispatch(removeSong(id)),
  playSong: id => dispatch(playSong(id))
})


class Song extends Component {
  handleClick = () => {
    this.props.playSong(this.props.index)
  }
  removeSong = () => {
    this.props.removeSong(this.props.index)
  }
  render() {
    return (
      <ListItem
      className="song"
      onClick={this.handleClick}
      leftAvatar={<Avatar icon={<ImageMusicNote />} />}
      primaryText={ <div className="song-title">{ this.props.song.name}</div> }
      rightIconButton={<FontIcon onClick={ this.removeSong } className="material-icons">delete</FontIcon>}
      />
    )
  }
}
  

export default connect(null,mapStateToDispatch)(Song)
