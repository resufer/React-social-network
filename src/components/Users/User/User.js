import defaultPhoto from '../../../assets/img/icon.png';
import { NavLink } from 'react-router-dom';
import style from './User.module.css';
import tryCatcher from '../../../utils/tryCatcher/tryCatcher';

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div key={user.id} className={style.users}>
      <div className={style.imgAndBtn}>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img src={tryCatcher(user.photos, 'small') || defaultPhoto} alt='photoProfile' />
          </NavLink>
        </div>
        <div>
          {user.followed
            ? <button disabled={followingInProgress.some(id => id === user.id)} value={user.followed}
              onClick={() => { unfollow(user.id) }}>Unfollow</button>

            : <button disabled={followingInProgress.some(id => id === user.id)} value={user.followed}
              onClick={() => { follow(user.id) }}>Follow</button>
          }
        </div>
      </div>

      <div className={style.description}>
        <span>
          <div className={style.fullName}>{user.name}</div>
          <div className={style.status}>{user.status || 'no status'}</div>
        </span>
      </div>
    </div>)
}

export default User;