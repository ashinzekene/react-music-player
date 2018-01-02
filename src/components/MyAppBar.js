import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import NavMenuIcon from 'material-ui/svg-icons/navigation/menu';

export default class MyAppBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }
  toggleSidebar() {
    this.setState(prevState => ({ open: !prevState.open }))
  }
  render() {
    let { open } = this.state
    return (
      <div>
        <AppBar
          iconElementLeft={<IconButton onClick={ this.toggleSidebar } ><NavMenuIcon /></IconButton>}
          style={{backgroundColor: "#7050FA"}}
          title="Music Player"  />
        <Drawer docked={false} open={ open }>
          <AppBar title="Menu" showMenuIconButton={false} />
          <MenuItem onClick={ this.toggleSidebar }>Now Playing</MenuItem>
          <MenuItem onClick={ this.toggleSidebar }>Equalizer</MenuItem>
          <MenuItem onClick={ this.toggleSidebar }>Playlists</MenuItem>
          <MenuItem onClick={ this.toggleSidebar }>Settings</MenuItem>
        </Drawer>
      </div>
    )
  }
}
