import React from 'react';
import $ from 'jquery';
import CommentBox from './modules/comment/containers/CommentBox';

const App = (props) => <CommentBox url={props.url}/>;

export default App;
