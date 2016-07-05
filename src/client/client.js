import React from 'react';
import {render} from 'react-dom';
import App from '../universal/app';

const renderApp = function() {
  render(
    <App url="/api/comments" pollInterval={2000} />,
    document.getElementById('root')
  );
}
renderApp();
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../universal/app', () => {
    const App = require('../universal/app');
    renderApp();
  });
}
