import { NavLink } from 'react-router-dom';
import style from './Header.module.css';

function Header(props) {
  return (
    <header className={style.header}>
      <img src="https://mostaql.hsoubcdn.com/uploads/201639-1469757735-Logo_Image_01.png" alt="logo" />

      <div className={style.loginBlock}>
        {props.isAuth ?
          <div>{props.login} <button onClick={props.logout}>Log out</button></div> :
          <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header;