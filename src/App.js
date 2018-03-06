import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400, } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainView from './views/MainView';
import { togglePlaying, playSong } from "./actions";

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo400,
  }
});

const mapStateToProps = (state) => ({
  songs: state.songs,
  playState: state.playState,
  shuffle: state.common.shuffle,
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(togglePlaying()),
  playSong: id => dispatch(playSong(id))
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <MainView/>
        </div>
      </MuiThemeProvider>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
