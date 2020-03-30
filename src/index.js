import React from 'react';
import ReactDOM from 'react-dom';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ThemeProvider>
    <CSSReset/>
    <App />
  </ThemeProvider>
  , document.getElementById('root'),
);

// registerServiceWorker();
