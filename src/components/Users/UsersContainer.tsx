import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, toggleFollowingProgress, getUsers, follow, unfollow } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsersPage, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  users: Array<UserType>
  totalUsersCount: number
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  setCurrentPage: any
  toggleFollowingProgress: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType


class UsersAPIComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        users={this.props.users}
        onPageChanged={this.onPageChanged}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
        totalUsersCount={this.props.totalUsersCount}
        //pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersPage(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

export let UsersContainer = compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
    (mapStateToProps, { setCurrentPage, follow, unfollow, toggleFollowingProgress, getUsers }),
)(UsersAPIComponent)
