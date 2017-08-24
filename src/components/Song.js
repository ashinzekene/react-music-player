import React from 'react';
import { ListItem } from 'material-ui/List'
import ImageMusicNote from 'material-ui/svg-icons/image/music-note'
import Avatar from 'material-ui/Avatar'


const Song = (props) => {
  var handleClick = () => {
    props.playSong(props.index)
  }
  return (
    <ListItem
      onClick = {handleClick}
      leftAvatar={<Avatar icon={<ImageMusicNote/>} />}
      primaryText={props.song.name}
    />
  )
}

export default Song