import React from 'react';
import { Redirect } from 'react-router-dom';
import Chat from './Chat/Chat';
import Message from './Message/Message';
import style from './Messages.module.css';
import { Field, reduxForm } from "redux-form";
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, requiredFields } from '../../utils/validators/validators';
import { Row, Col, Button } from 'antd';

let maxLength500 = maxLengthCreator(500);

let AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div><Field component={Textarea} validate={[requiredFields, maxLength500]} name='newMessageText' placeholder='Enter your message' /></div>
      <div><button>Send</button></div>
    </form>
  )
}

let AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

function Messages(props) {
  if (!props.isAuth) return <Redirect to={'/login'} />

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageText)
  }

  return (
    <div>
      <h2>Messages</h2>
      <Row className={style.main}>
        <Col span={6}>
          <div className={style.friends}>
            {props.chatData.map(a => <Chat name={a.name} id={a.id} key={a.id} src={a.src} />)}
          </div>
        </Col>

        <Col span={14}>
          <div className={style.messages}>
            {props.messageData.map(a => <Message message={a.message} key={a.id} isOwnSender={a.isOwnSender} />)}
          </div>
          <div className={style.addMessageForm}>
            <AddMessageFormRedux onSubmit={addNewMessage} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Messages;