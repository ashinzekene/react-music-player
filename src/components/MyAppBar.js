import React from 'react';
import AppBar from 'material-ui/AppBar';
// import Drawer from 'material-ui/Drawer'
// import MenuItem from 'material-ui/MenuItem';


export default class MyAppBar extends React.Component {
  render() {
    return (
      <div>
        <AppBar style={{backgroundColor: "#7050FA"}} title="Music Player"  />
        {/* <Drawer docked={false} open={ open }>
          <AppBar title="Menu" showMenuIconButton={false} />
          <MenuItem>Now Playing</MenuItem>
          <MenuItem>Equalizer</MenuItem>
          <MenuItem>Playlists</MenuItem>
          <MenuItem>Settings</MenuItem>
        </Drawer> */}
      </div>
    )
  }
}
