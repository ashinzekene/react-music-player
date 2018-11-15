import React from 'react';
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
  remove: id => dispatch(removeSong(id)),
  play: id => dispatch(playSong(id)),
});

// const createImgUrl = image => {
//   const blob = new Blob([new Uint8Array(image.data)]);
//   return URL.createObjectURL(blob);
// }

const MenuOptions = ({ remove }) => (
<div>
  <MenuItem onClick={this.removeSong} primaryText="RemoveSong" />
</div>
)

const Song = ({ play, remove, song, index }) => (
  <ListItem
    className="song"
    onClick={() => play(index)}
    leftAvatar={<Avatar icon={<ImageMusicNote />} />}
    primaryText={<div className="song-title">{ song.title }</div>}
    secondaryText={<div className="song-title">{ song.artist || song.album }</div>}
    rightIconButton={(
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuOptions remove={remove}/>
      </IconMenu>
    )}
  />
);

Song.propTypes = {
  remove: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  song: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapStateToDispatch)(Song);
