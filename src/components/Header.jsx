import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import NowPlayingIcon from '@material-ui/icons/PlaylistPlay';
import PlayListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

import {
  HOME_PAGE, SETTINGS_PAGE, NOW_PLAYING_PAGE, PLAYLIST_PAGE,
} from '../actions';

const mapDispatchToProps = dispatch => ({
  openPage: type => dispatch({ type }),
});

const menuOptions = [
  {
    option: 'Home',
    page: HOME_PAGE,
    icon: <HomeIcon />,
  },
  {
    option: 'NowPlaying',
    page: NOW_PLAYING_PAGE,
    icon: <NowPlayingIcon />,
  },
  {
    option: 'Playlists',
    page: PLAYLIST_PAGE,
    icon: <PlayListIcon />,
  },
  {
    option: 'Settings',
    page: SETTINGS_PAGE,
    icon: <SettingsIcon />,
  },
];

class Header extends Component {
  state = {
    open: false,
  };

  openPage = page => () => {
    const { openPage, playState, openSnackbar } = this.props;
    this.setState(prevState => ({ open: !prevState.open }));
    if (page === PLAYLIST_PAGE || page === SETTINGS_PAGE) {
      openSnackbar();
      return;
    }
    // Don't Open now playing page when there is no song
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
        <div className="header-padding" style={{ height: '55px' }} />
        <SwipeableDrawer anchor="left" open={open} onClose={this.openPage()} onOpen={this.openPage()}>
          <div style={{ paddingTop: '50px' }} />
          {
            menuOptions.map(option => (
              <ListItem key={option.option} button onClick={this.openPage(option.page)}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText>{option.option}</ListItemText>
              </ListItem>
            ))
          }
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
