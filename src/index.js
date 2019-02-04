import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import loggerMiddleware from './middleware';
import { saveState, getState } from './store/localStore';
import mediaNotification from './utils/media-session';

const muiTheme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
});


getState().then((localState) => {
  let store;
  if (process.env.NODE_ENV === 'development') {
    store = createStore(reducers, localState, applyMiddleware(loggerMiddleware));
  } else {
    store = createStore(reducers, localState);
  }
  mediaNotification.setStore(store);
  store.subscribe(() => {
    saveState({
      songs: store.getState().songs,
    });
  });
  ReactDOM.render(
    // eslint-disable-next-line
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>, document.getElementById('root'),
  );
});
registerServiceWorker();
