import React from 'react';
import Html from './Html';
import { renderToString } from 'react-dom/server';
import {join, basename} from 'path';

function renderApp(req, res, chunks) {
  // Needed so some components can render based on location
  try {
    const htmlStream = renderToString(<Html
      chunks={chunks}
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

export default async function SSR(req, res, chunks) {
  renderApp(req, res, chunks);
}
