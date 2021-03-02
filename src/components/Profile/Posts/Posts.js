import { Field, reduxForm } from 'redux-form';
import { requiredFields, maxLengthCreator, obsceneLanguage } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import Post from './Post/Post';
import style from './Posts.module.css';
import React from 'react';

let maxLength50 = maxLengthCreator(50)

let AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field className={style.entryField} component={Textarea} name='sendPost' validate={[requiredFields, maxLength50, obsceneLanguage]} placeholder='post message' />
      <button className={style.sendMessage}>Send</button>
    </form>
  )
}

let AddNewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm)

let Posts = React.memo(props => {
  let sendPost = (values) => {
    props.addPost(values.sendPost);
  }

  return (
    <div className={style.posts}>
      <h2 className={style.description}>My posts</h2>
      <AddNewPostFormRedux onSubmit={sendPost} />
      {props.postData.map(a => <Post text={a.text} key={a.id} photoMessage={props.photoMessage} />)}
    </div>
  )
})

export default Posts;