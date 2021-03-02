import { NavLink } from 'react-router-dom';
import style from './Aside.module.css'

function Aside() {
  return (
    <aside className={style.aside}>
      <nav>
        <ul>
          {/* <li><NavLink to='/profile' activeClassName={style.open}>Profile</NavLink></li>
          <li><NavLink to='/messages' activeClassName={style.open}>Messages</NavLink></li>
          <li><NavLink to='/news' activeClassName={style.open}>News</NavLink></li>
          <li><NavLink to='/music' activeClassName={style.open}>Music</NavLink></li>
          <li><NavLink to='/users' activeClassName={style.open}>Find users</NavLink></li>
          <li><NavLink to='/settings' activeClassName={style.open}>Settings</NavLink></li> */}
        </ul>
      </nav>
    </aside>
  )
}

export default Aside;