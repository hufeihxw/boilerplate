import React from 'react';

export default function Comment(props) {
  return (
    <div className="comment">
      <h2 className="commentAuthor">
        {props.author}
      </h2>
      <span>{props.children.toString()} </span>
    </div>
  );
}

Comment.propTypes = {
  author: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired
}
