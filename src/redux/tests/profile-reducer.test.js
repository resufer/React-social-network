import profileReducer, { sendPostActionCreator } from '../profile-reducer';
import ReactDOM from 'react-dom';
import React from 'react';

let state = {
  postData: [{ id: 1, text: 'some' },
  { id: 2, text: 'not some' },
  { id: 3, text: 'fuck you evan' },
  { id: 4, text: 'sorry' },
  { id: 5, text: 'No' }]
}

it('length of post should be incremented', () => {
  let action = sendPostActionCreator('testing');

  let newState = profileReducer(state, action);

  expect(newState.postData.length).toBe(6)
})

it('text of new post should be a "testing"', () => {
  let action = sendPostActionCreator('testing');

  let newState = profileReducer(state, action);

  expect(newState.postData[newState.postData.length - 1].text).toBe('testing')
})
