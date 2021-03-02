import style from './Chat.module.css';

const Chat = (props) => {
  return (
    <div className={style.chat}>
      <img src={props.src} alt='img' />
      <div>{props.name}</div>
    </div>
  )
}

export default Chat;