import React, { useState } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { removeSong, playSong } from '../actions';
import Song from './Song';

const SongList = ({ songs, remove, play }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [activeSong, setActiveSong] = useState(-1);

  const setActiveSongItem = ind => ({ target }) => {
    setAnchorEl(target);
    setActiveSong(ind);
  };

  const handleSongClick = ind => () => play(ind);

  if (!songs.length) {
    return (
      <h4 style={{ fontWeight: 300, textAlign: 'center' }}>No Songs Present. Please Add Songs</h4>
    );
  }
  return (
    <div style={{ marginBottom: '100px' }}>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => remove(activeSong)}>Remove Song</MenuItem>
      </Menu>
      <List>
        {
          songs.map((song, ind) => (
            [
              <Song
                key={`song-${song.lastModifiedDate}`}
                handleClick={handleSongClick(ind)}
                handleIconClick={setActiveSongItem(ind)}
                song={song}
              />,
              <Divider key={`divider-${song.lastModifiedDate}`} />,
            ]
          ))
        }
      </List>
    </div>
  );
};

SongList.propTypes = {
  remove: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default connect(null, { remove: removeSong, play: playSong })(SongList);
