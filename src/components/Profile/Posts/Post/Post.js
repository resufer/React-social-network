import style from './Post.module.css';
import defaultPhoto from '../../../../assets/img/icon.png';
import tryCatcher from '../../../../utils/tryCatcher/tryCatcher';

function Post(props) {
  return (
    <div className={style.post}>
      <img src={tryCatcher(props.photoMessage, 'small') || defaultPhoto} alt='photoMessage' />
      <span>{props.text}</span>
    </div>
  )
}

export default Post;