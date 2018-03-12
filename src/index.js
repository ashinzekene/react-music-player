import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import { loggerMiddleware } from "./middleware";
import { saveState, getState } from './store/localStore'
// import createStoreObserver from  'redux-store-observer'

getState().then(localState => {
  const store = createStore(reducers, localState, applyMiddleware(loggerMiddleware))
  store.subscribe(() => {
    saveState({
      songs: store.getState().songs
    })
  })
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));
  
})
registerServiceWorker();

