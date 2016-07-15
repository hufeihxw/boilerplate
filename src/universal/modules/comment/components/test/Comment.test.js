import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Comment from '../Comment';

test('Comment',async t => {
  const author = 'aaaa';
  const text = 'test text';
  const wrapper = shallow(<Comment author={author}>{text}</Comment>);
  t.true(wrapper.find('h2').matchesElement(<h2 className="commentAuthor">{author}</h2>))
  t.true(wrapper.find('span').matchesElement(<span>{text} </span>))
});
