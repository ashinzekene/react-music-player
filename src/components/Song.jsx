import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import ImageMusicNote from 'material-ui/svg-icons/image/music-note';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { IconMenu } from 'material-ui';
import { removeSong, playSong } from '../actions';

const mapStateToDispatch = dispatch => ({
  removeSong: id => dispatch(removeSong(id)),
  playSong: id => dispatch(playSong(id)),
});


class Song extends Component {
  handleClick = () => {
    const { playSong: play, index } = this.props;
    play(index);
  }

  removeSong = () => {
    const { removeSong: remove, index } = this.props;
    remove(index);
  }

  menuOptions = () => (
    <div>
      <MenuItem onClick={this.removeSong} primaryText="RemoveSong" />
      {/* eslint-disable-next-line */}
      <MenuItem onClick={this.props.openSnackbar} primaryText="Add to Playlist" />
    </div>
  )

  render() {
    const { song } = this.props;
    return (
      <ListItem
        className="song"
        onClick={this.handleClick}
        leftAvatar={<Avatar icon={<ImageMusicNote />} />}
        primaryText={<div className="song-title">{ song.name }</div>}
        rightIconButton={(
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            { this.menuOptions() }
          </IconMenu>
        )}
      />
    );
  }
}

Song.propTypes = {
  removeSong: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  song: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapStateToDispatch)(Song);
