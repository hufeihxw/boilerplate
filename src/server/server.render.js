import React from 'react';
import Html from './Html';
import { renderToStaticMarkup } from 'react-dom/server';
import {join, basename} from 'path';


function renderApp(res) {
  // Needed so some components can render based on location
  try {
    const htmlStream = renderToStaticMarkup(<Html
      title="boilerplate"
    />);
    res.write('<!DOCTYPE html>');
    res.write(htmlStream);
    res.end();
  } catch (e) {
    console.error(e)
    res.status(500).end();
  }
}

export default async function SSR(req, res) {
  // res.send('Hello World!');
    renderApp(res);
}
