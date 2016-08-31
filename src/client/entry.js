import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-fela'
import felaRenderer from '../universal/felaRenderer'

import App from '../universal/app';

const renderer = felaRenderer(document.getElementById('font-stylesheet'))

const mountNode = document.getElementById('stylesheet')
mountNode.textContent = ''

const renderApp = function() {
  render(
    <Provider renderer={renderer} mountNode={mountNode}>
      <App/>
    </Provider>,
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
