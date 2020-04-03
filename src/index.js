import React from 'react';
import ReactDOM from 'react-dom';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

import App from './App';
import { ProvideState } from './state';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ProvideState>
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </ProvideState>,
  document.getElementById('root'),
);

// registerServiceWorker();
