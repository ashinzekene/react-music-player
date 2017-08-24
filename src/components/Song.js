import React from 'react';
import { ListItem } from 'material-ui/List'
import ImageMusicNote from 'material-ui/svg-icons/image/music-note'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import Avatar from 'material-ui/Avatar'


const Song = (props) => {
  var handleClick = () => {
    props.playSong(props.index)
  }
  var removeSong = () => {
    props.removeSong(props.index)
  }
  return (
    <ListItem
      onClick = {handleClick}
      leftAvatar={<Avatar icon={<ImageMusicNote/>} />}
      primaryText={props.song.name}
      rightIconButton={<ActionDelete onClick={ removeSong() } />}
    />
  )
}

export default Song