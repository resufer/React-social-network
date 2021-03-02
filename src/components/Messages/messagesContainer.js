import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { sendMessageCreator } from './../../redux/messages-reducer';
import Messages from './Messages';

let mapStateToProps = (state) => {
  return {
    messageData: state.messagesPage.messageData,
    chatData: state.messagesPage.chatData,
    newMessageText: state.messagesPage.newMessageText,
    isAuth: state.auth.isAuth
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageText) => { dispatch(sendMessageCreator(newMessageText)) }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Messages);