import { connect } from 'react-redux';
import { sendPostActionCreator } from '../../../redux/profile-reducer';
import Posts from './Posts';

let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    postData: state.profilePage.postData,
    photoMessage: state.profilePage.profile.photos
  }
}
let mapDispatchToProps = (dispatch) => {
  return { addPost: (Post) => { dispatch(sendPostActionCreator(Post)) } }
}

let PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;