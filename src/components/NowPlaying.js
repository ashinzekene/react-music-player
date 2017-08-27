import React from 'react';
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton';
import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled'
import ImageMusicNote from 'material-ui/svg-icons/image/music-note'

class NowPlaying extends React.Component {
  constructor(props) {
    super(props)
    this.togglePlaying = this.togglePlaying.bind(this)
  }
  togglePlaying() {
    this.props.togglePlaying()
  }
  render() {
    return (
      <Paper style={{backgroundColor: "white", zIndex: "4000", position: "fixed", bottom: "0px", left: "0px", width: "100%", height: "70px"}} zDepth={5} rounded={false}>
        <ListItem
          leftIcon={<Avatar icon={<ImageMusicNote/>}/>}
          rightIconButton={<IconButton onClick={this.togglePlaying} ><AvPlayCircleFilled/></IconButton>}
          primaryText= {this.props.nowPlaying}
          secondaryText="Made by Ashinze Ekene"
        />
      </Paper>
    )
  }
}

export default NowPlaying