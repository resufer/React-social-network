import style from './inDeveloping.module.css';

let InDeveloping = (props) => {
  return (
    <div className={style.inDevelop}>
      <div className={style.description}>Простите, но страница {props.page} пока находится в стадии разработки </div>
    </div>
  )
}

export default InDeveloping;