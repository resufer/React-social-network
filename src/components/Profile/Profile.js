import style from './Profile.module.css';
import Info from './Info/Info';
import PostsContainer from './Posts/postsContainer';
import { Redirect } from 'react-router-dom';

function Profile(props) {
  if (!props.isAuth) return <Redirect to={'/login'} />

  return (
    <main className={style.profile}>
      <Info savePhoto={props.savePhoto} updateStatus={props.updateStatus} saveProfile={props.saveProfile}
        isOwner={props.isOwner} profile={props.profile} status={props.status} />
      <PostsContainer />
    </main>
  )
}

export default Profile;