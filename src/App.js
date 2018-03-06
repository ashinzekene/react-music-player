import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400, } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux';
import { HOME_PAGE, NOW_PLAYING_PAGE, SETTINGS_PAGE } from './actions'

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
  console.log(props)
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        {
          props.page === NOW_PLAYING_PAGE ?
           <PlayingView /> :
           <MainView />
        }
      </div>
    </MuiThemeProvider>
  )
}


export default connect(mapStateToProps)(App);
