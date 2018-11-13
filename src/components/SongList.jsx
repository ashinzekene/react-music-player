import React from 'react';
import Divider from 'material-ui/Divider';
import { List } from 'material-ui/List';
import PropTypes from 'prop-types';

import Song from './Song';

const SongList = ({ songs }) => {
  if (!songs[0]) {
    return (
      <h4 style={{ fontWeight: 300, textAlign: 'center' }}>No Songs Present. Please Add Songs</h4>
    );
  }
  return (
    <div style={{ marginBottom: '100px' }}>
      <List>
        {
          songs.map((song, ind) => (
            <div key={`song-${(Math.random() * 10000000).toFixed(0)}-${song.size}`}>
              <Song song={song} index={ind} />
              <Divider key={song.lastModified} />
            </div>
          ))
        }
      </List>
    </div>
  );
};

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default SongList;
