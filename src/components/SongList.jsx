import React from 'react';
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'

import Song from './Song'

const SongList = (props) => {
  if (!props.songs[0]) {
    return (
      <h4 style={{fontWeight: 300, textAlign: "center" }}>No Songs Present. Please Add Songs</h4>
    )
  }
  return (
    <div style={{marginBottom: "100px"}}>
      <List>
        {
          props.songs.map((song, ind) => (
            <div key={"div"+ind}>
              <Song openSnackbar={props.openSnackbar} key={ind} song= { song } index= {ind} />
              <Divider key={song.lastModified}/> 
            </div>
          ))
        }
      </List>
    </div>
  )
}

export default SongList