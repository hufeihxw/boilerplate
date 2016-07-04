/* eslint react/no-danger:0 */
import React, {Component, PropTypes} from 'react';
import {renderToString} from 'react-dom/server';
import App from '../universal/app';

// Injects the server rendered state and app into a basic html template
export default class Html extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    assets: PropTypes.object,
    renderProps: PropTypes.object
  }

  render() {
    const PROD = process.env.NODE_ENV === 'production';
    const {title} = this.props;
    const root = renderToString(
      <App url="/api/comments" pollInterval={2000} />);
    return (
      <html>
      <head>
        <meta charSet="utf-8"/>
        <title>{title}</title>
      </head>
      <body>
      <div id="root" dangerouslySetInnerHTML={{__html: root}}></div>
      {PROD && <script src={vendor.js}/>}
      <script src={PROD ? app.js : '/static/app.js'}/>
      </body>
      </html>
    );
  }
}
