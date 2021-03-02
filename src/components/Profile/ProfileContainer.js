import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  rerenderProfile = () => {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login');
      }
    }
    this.props.setProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.rerenderProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.rerenderProfile();
    }
  }

  render() {
    return (<Profile savePhoto={this.props.savePhoto} profile={this.props.profile}
      status={this.props.status} updateStatus={this.props.updateStatus} saveProfile={this.props.saveProfile}
      isOwner={!this.props.match.params.userId} {...this.props} />)
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth
})

export default compose(
  connect(mapStateToProps, { setProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter
)(ProfileContainer)