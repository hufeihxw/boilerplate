import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import CommentForm from '../CommentForm';

test('CommentForm',async t => {
  const author = 'aaa';
  const text = 'test text';
  const newAuthor = 'new author';
  const newText = 'new text';
  const handleTextChange = (text)=>{
    t.is(text, newText);
  }
  const handleAuthorChange = (author)=>{
    t.is(author, newAuthor);
  }
  const handleCommentSubmit = ({author, text})=>{
    t.is(author, newAuthor);
    t.is(text, newText);
  }
  const wrapper = shallow(<CommentForm author={author} text={text} actions={{handleTextChange, handleAuthorChange, handleCommentSubmit}}/>);
  const authorInput = wrapper.find('input').at(0);
  const textInput = wrapper.find('input').at(1);
  const submitButton = wrapper.find('input').at(2);
  t.is(authorInput.prop('value'), author)
  t.is(textInput.prop('value'), text)
  authorInput.simulate('change', {target: {value: newAuthor}});
  textInput.simulate('change', {target: {value: newText}});
  submitButton.simulate('click');
});
