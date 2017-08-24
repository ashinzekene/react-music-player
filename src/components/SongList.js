import React from 'react';
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'

import Song from './Song'

const SongList = (props) => {
  const playSong = (songIndex) => {
    props.playSong(songIndex)
  }
  const removeSong = (songIndex) => {
    props.removeSong(songIndex)
  }
  if (!props.songs[0]) return (
    <h3 style={{fontWeight:300, textAlign: "center"}}>No Songs, Please Add Music Files</h3>
  )
  return (
    <div>
      <List>
        {
          props.songs.map((song, ind) => (
            <div>
              <Song song={song} key={ind} index={ind} removeSong={removeSong} playSong={playSong} />
              <Divider key={song.lastModified}/> 
            </div>
          ))
        }
      </List>
    </div>
  )
}

export default SongList