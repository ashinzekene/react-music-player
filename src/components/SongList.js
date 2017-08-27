import React from 'react';
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'

import Song from './Song'

const SongList = (props) => {
  if (!props.songs[0]) {
    return (
      <h2 style={{fontWeight: 300, textAlign: "center" }}>No Songs Present. Please Add Songs</h2>
    )
  }
  const playSong = (index) => {
    props.playSong(index)
  }
  return (
    <div>
      <List>
        {
          props.songs.map((song, ind) => (
            <div key={"div"+ind}>
              <Song key={ind} song= { song } playSong={playSong} index= {ind} />
              <Divider key={song.lastModified}/> 
            </div>
          ))
        }
      </List>
    </div>
  )
}

export default SongList