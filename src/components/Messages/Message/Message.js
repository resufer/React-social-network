import style from './Message.module.css';

const Message = ({ message, isOwnSender }) => {
  return (
    <div className={style.message} value={isOwnSender}>{message}</div>
  )
}

export default Message;