import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MusicPlayer from './components/MusicPlayer';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <MusicPlayer/>
      </MuiThemeProvider>
    );
  }
}

export default App;
