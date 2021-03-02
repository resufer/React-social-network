type chatDataType = {
  id: number
  name: string
  src: string
}

type messageData = {
  messageId: number
  message: string
  isOwnSender: boolean
}

let initialState = {
  chatData: [{ id: 2, name: 'Dimych', src: 'https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=7' }] as Array<chatDataType>,
  messageData: [{ messageId: 1, message: 'Коничива Самурай!', isOwnSender: false },
  { messageId: 2, message: 'Коничива Сенсей!', isOwnSender: true }] as Array<messageData>
};
type InitialStateType = typeof initialState;

const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  if (action.type === 'messages/SEND-MESSAGE') {
    return {
      ...state,
      messageData: [...state.messageData,
      { messageId: state.messageData[state.messageData.length - 1].messageId + 1, message: action.newMessageText, isOwnSender: true }]
    }
  }
  return { ...state };
}; export default messagesReducer

type ActionsTypes = SendMessageCreatorType;

type SendMessageCreatorType = {
  type: 'messages/SEND-MESSAGE',
  newMessageText: string
}
export let sendMessageCreator = (newMessageText: string): SendMessageCreatorType => ({
  type: 'messages/SEND-MESSAGE', newMessageText
})


