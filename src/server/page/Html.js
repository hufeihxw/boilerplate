/* eslint react/no-danger:0 */
import React, {Component, PropTypes} from 'react';
import {renderToString} from 'react-dom/server';

import { Provider } from 'react-fela'
import felaRenderer from '../../universal/felaRenderer'
import App from '../../universal/app'


const renderer = felaRenderer()

// Injects the server rendered state and app into a basic html template
export default class Html extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    chunks: PropTypes.object.isRequired,
    renderProps: PropTypes.object
  }

  render() {
    const PROD = process.env.NODE_ENV === 'production';
    const {title} = this.props;

    const htmlMarkup = renderToString(
      <App renderer={renderer} />
    )
    // const appHtml = renderToString(
    //   <Provider renderer={renderer}>
    //   </Provider>
    // );
    const scripts = Object.entries(this.props.chunks.javascript).map(([name, value])=><script key={name} src={value}/>)
    const styles = Object.entries(this.props.chunks.styles).map(([name, value])=><style key={name} src={value}/>)
    return (
      <html>
      <head>
        <meta charSet='utf-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
        <title>{title}</title>
        <style id='stylesheet'/>
        <style id='font-stylesheet'/>
        {styles}
      </head>
      <body>
      <div id='root'>{htmlMarkup}</div>
      {PROD && <script src={vendor.js}/>}
      {scripts}
      </body>
      </html>
    );
  }
}
