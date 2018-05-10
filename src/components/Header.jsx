import React, { Component } from 'react';
import propTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import NavMenuIcon from 'material-ui/svg-icons/navigation/menu';

import { connect } from 'react-redux'
import { HOME_PAGE, SETTINGS_PAGE, NOW_PLAYING_PAGE, PLAYLIST_PAGE } from '../actions'

const mapDispatchToProps = dispatch => ({
  openPage: (type) => dispatch({ type })
})


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  openPage = page => () => {
    this.setState(prevState => ({ open: !prevState.open }))
    // Don't Open now playing page when there is no song 
    if (page === PLAYLIST_PAGE || page === SETTINGS_PAGE) {
      this.props.openSnackbar()
      return
    }
    if (!this.props.playState && page === NOW_PLAYING_PAGE) return
    page && this.props.openPage(page)
  }

  render() {
    let { open } = this.state
    return (
      <div>
        <AppBar
          iconElementLeft={<IconButton onClick={ this.openPage() } ><NavMenuIcon /></IconButton>}
          style={{backgroundColor: "#7050FA", position: "fixed"}}
          title="Music Player"  />
        <div className="header-padding" style={{ height: "60px" }}></div>
        <Drawer docked={false} open={ open }>
          <AppBar title="Menu" showMenuIconButton={false} />
          <MenuItem onClick={ this.openPage(HOME_PAGE) }>Home</MenuItem>
          <MenuItem onClick={ this.openPage(NOW_PLAYING_PAGE) }>NowPlaying</MenuItem>
          <MenuItem onClick={ this.openPage(PLAYLIST_PAGE) }>Playlists</MenuItem>
          <MenuItem onClick={ this.openPage(SETTINGS_PAGE) }>Settings</MenuItem>
        </Drawer>
      </div>
    )
  }
}

Header.propTypes = {
  openPage: propTypes.func.isRequired,
  playingSong: propTypes.object,
  openSnackbar: propTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Header); 