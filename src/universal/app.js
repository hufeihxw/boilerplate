import React from 'react';
import autobind from 'autobind-decorator';
import {Badge, Icon} from 'react-mdl';

require('react-mdl/extra/material.js'); //see https://github.com/tleunen/react-mdl
require('react-mdl/extra/material.css'); //see https://github.com/tleunen/react-mdl

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  @autobind
  onContentChange(editorState) {
  }
  render() {
    return (
      <Badge text="1" overlap>
        <Icon name="account_box" />
      </Badge>
    );
  }
};
