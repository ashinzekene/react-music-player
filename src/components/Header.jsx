import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {
  HOME_PAGE, SETTINGS_PAGE, NOW_PLAYING_PAGE, PLAYLIST_PAGE,
} from '../actions';

const mapDispatchToProps = dispatch => ({
  openPage: type => dispatch({ type }),
});


class Header extends Component {
  state = {
    open: false,
  };

  openPage = page => () => {
    const { openPage, playState, openSnackbar } = this.props;
    this.setState(prevState => ({ open: !prevState.open }));
    // Don't Open now playing page when there is no song
    if (page === PLAYLIST_PAGE || page === SETTINGS_PAGE) {
      openSnackbar();
      return;
    }
    if (!playState && page === NOW_PLAYING_PAGE) return;
    if (page) openPage(page);
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton onClick={this.openPage()} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Music Player
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer anchor="left" open={open} onClose={this.openPage()} onOpen={this.openPage()}>
          <MenuItem onClick={this.openPage(HOME_PAGE)}>Home</MenuItem>
          <MenuItem onClick={this.openPage(NOW_PLAYING_PAGE)}>NowPlaying</MenuItem>
          <MenuItem onClick={this.openPage(PLAYLIST_PAGE)}>Playlists</MenuItem>
          <MenuItem onClick={this.openPage(SETTINGS_PAGE)}>Settings</MenuItem>
        </SwipeableDrawer>
      </div>
    );
  }
}

Header.propTypes = {
  openPage: propTypes.func.isRequired,
  playState: propTypes.objectOf(propTypes.any).isRequired,
  openSnackbar: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
