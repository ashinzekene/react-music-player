import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo400, } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import MainView from './views/MainView';

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo400,
  }
});

const App = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <MainView />
      </div>
    </MuiThemeProvider>
  )
}


export default App
