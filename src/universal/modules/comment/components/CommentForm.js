import React from 'react';
import autobind from 'autobind-decorator';

class CommentForm extends React.Component{
  @autobind
  handleAuthorChange(e) {
    console.log(e)
    this.props.actions.handleAuthorChange && this.props.actions.handleAuthorChange(e.target.value);
  }
  @autobind
  handleTextChange(e) {
    this.props.actions.handleTextChange && this.props.actions.handleTextChange(e.target.value);
  }
  @autobind
  handleSubmit(e) {
    e.preventDefault();
    var author = this.props.author.trim();
    var text = this.props.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.actions.handleCommentSubmit && this.props.actions.handleCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  }
  render() {
    let {author, text} = this.props;
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
};

CommentForm.propTypes = {
  author: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  actions: React.PropTypes.shape({
    handleTextChange: React.PropTypes.function,
    handleAuthorChange: React.PropTypes.function,
    handleCommentSubmit: React.PropTypes.function
  })
}
export default CommentForm;
