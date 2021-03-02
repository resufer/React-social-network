import { UserType } from './../types/types';
import { userAPI } from '../api/api';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number> // array of users id's
}
type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  if (action.type === 'users/FOLLOW_UNFOLLOW') {
    return {
      ...state,
      users: state.users.map(a => {
        if (a.id === action.userId) {
          return { ...a, followed: !a.followed }
        }
        return a
      })
    }
  }
  else if (action.type === 'users/SET_USERS') {
    try {
      if ([state.users[state.users.length - 1].name] === [action.users[action.users.length - 1].name]) return state
      else return { ...state, users: action.users }
    }
    catch {
      return { ...state, users: [...state.users, ...action.users] }
    }
  }
  else if (action.type === 'users/SET_CURRENT_PAGE') {
    return {
      ...state,
      currentPage: action.currentPage
    }
  }
  else if (action.type === 'users/SET_TOTAL_USERS_COUNT') {
    //console.log(action.totalCount)
    return {
      ...state,
      totalUsersCount: action.totalCount
    }
  }
  else if (action.type === 'users/TOGGLE_IS_FETCHING') {
    return {
      ...state,
      isFetching: action.isFetching
    }
  }
  else if (action.type === 'users/TOGGLE_IS_FOLLOWING_PROGRESS') {
    return {
      ...state,
      followingInProgress: action.progress ?
        [...state.followingInProgress, action.userId] :
        state.followingInProgress.filter(id => id !== action.userId)
    }
  }

  return state;
}; export default usersReducer


type AcceptFollowUnfollowACType = {
  type: 'users/FOLLOW_UNFOLLOW'
  userId: number
}; export let acceptFollowUnfollow = (userId: number): AcceptFollowUnfollowACType => ({ type: 'users/FOLLOW_UNFOLLOW', userId })

type SetUsersACType = {
  type: 'users/SET_USERS'
  users: Array<UserType>
}; export let setUsers = (users: any): SetUsersACType => ({ type: 'users/SET_USERS', users })

type SetCurrentPageACType = {
  type: 'users/SET_CURRENT_PAGE'
  currentPage: number
}; export let setCurrentPage = (currentPage: number): SetCurrentPageACType => ({ type: 'users/SET_CURRENT_PAGE', currentPage })

type SetTotalUsersCountACType = {
  type: 'users/SET_TOTAL_USERS_COUNT'
  totalCount: number
}; export let setTotalUsersCount = (totalCount: number): SetTotalUsersCountACType => ({ type: 'users/SET_TOTAL_USERS_COUNT', totalCount })

type ToggleIsFetchingACType = {
  isFetching: boolean
  type: 'users/TOGGLE_IS_FETCHING'
}; export let toggleIsFetching = (isFetching: boolean): ToggleIsFetchingACType => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching })

type toggleFollowingProgressACType = {
  progress: any
  userId: number
  type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS'
}; export let toggleFollowingProgress = (progress: any, userId: number): toggleFollowingProgressACType =>
  ({ type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', progress, userId })

type ActionsTypes = AcceptFollowUnfollowACType | SetUsersACType | SetCurrentPageACType |
  SetTotalUsersCountACType | ToggleIsFetchingACType | toggleFollowingProgressACType;

type DispatchType = Dispatch<ActionsTypes>;

export let getUsers = (currentPage: number, pageSize: number) => async (dispatch: DispatchType) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));
  let response = await userAPI.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));
}

export let follow = (userId: number) => async (dispatch: DispatchType) => {
  dispatch(toggleFollowingProgress(true, userId));
  let resultCode = await userAPI.follow(userId);
  if (resultCode === 0) dispatch(acceptFollowUnfollow(userId));
  dispatch(toggleFollowingProgress(false, userId));
}


export let unfollow = (userId: number) => async (dispatch: DispatchType) => {
  dispatch(toggleFollowingProgress(true, userId));
  let resultCode = await userAPI.unfollow(userId)
  if (resultCode === 0) dispatch(acceptFollowUnfollow(userId));
  dispatch(toggleFollowingProgress(false, userId));
}