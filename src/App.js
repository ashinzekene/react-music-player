import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400, } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux';
import { NOW_PLAYING_PAGE } from './actions'

import MainView from './views/MainView';
import PlayingView from './views/PlayingView';

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo400,
  }
});

const mapStateToProps = state => ({
  page: state.page 
})

const App = props => {
  let currentTime = 0
  const changeTime = newTime => () => {
    currentTime = newTime
  } 
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        {
          props.page === NOW_PLAYING_PAGE ?
           <PlayingView currentTime={ currentTime } /> :
           <MainView currentTime={ changeTime(newTime) }  />
        }
      </div>
    </MuiThemeProvider>
  )
}


export default connect(mapStateToProps)(App);
