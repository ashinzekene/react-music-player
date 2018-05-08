import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import ImageMusicNote from 'material-ui/svg-icons/image/music-note';
import Avatar from 'material-ui/Avatar';
// import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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
  menuOptions = () => (
    <div>
      <MenuItem onClick={ this.removeSong } primaryText="RemoveSong" />
      <MenuItem primaryText="Add to Playlist" />
    </div>
  )

  render() {
    return (
      <ListItem
      className="song"
      onClick={this.handleClick}
      leftAvatar={<Avatar icon={<ImageMusicNote />} />}
      primaryText={ <div className="song-title">{ this.props.song.name}</div> }
      rightIconButton={<IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >{ this.menuOptions() }</IconMenu> }
      />
    )
  }
}


export default connect(null,mapStateToDispatch)(Song)
