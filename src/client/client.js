import React from 'react';
import ReactDOM from 'react-dom';
import App from '../universal/app';


ReactDOM.render(
  <App url="/api/comments" pollInterval={2000} />,
  document.getElementById('root')
);
