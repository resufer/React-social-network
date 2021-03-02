import { PostDataType, PhotosType, ProfileType } from './../types/types';
import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';


let initialState = {
  postData: [{ id: 1, text: 'hmmm' },
  { id: 2, text: 'Hi!' }] as Array<PostDataType>,
  profile: {} as ProfileType | null,
  status: ''
}

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
  if (action.type === 'profile/ADD-POST') {
    return { ...state, postData: [...state.postData, { id: state.postData[state.postData.length - 1].id + 1, text: action.Post }] }
  }
  else if (action.type === 'profile/SET_USER_PROFILE') {
    return { ...state, profile: action.profile }
  }
  else if (action.type === 'profile/SET_STATUS') {
    return { ...state, status: action.status }
  }
  else if (action.type === 'profile/SET_PHOTO_SUCCESS') {
    return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
  }

  return { ...state };
}
export default profileReducer;


type SendPostACType = {
  type: 'profile/ADD-POST'
  Post: string
}; export let sendPostActionCreator = (Post: string): SendPostACType => ({ type: 'profile/ADD-POST', Post })

type SetUserProfileACType = {
  type: 'profile/SET_USER_PROFILE'
  profile: ProfileType
}; export let setUserProfile = (profile: ProfileType): SetUserProfileACType => ({ type: 'profile/SET_USER_PROFILE', profile })

type SetStatusACType = {
  type: 'profile/SET_STATUS',
  status: string
}; export let setStatus = (status: string): SetStatusACType => ({ type: 'profile/SET_STATUS', status })

type SetPhotoSuccessACType = {
  type: 'profile/SET_PHOTO_SUCCESS'
  photos: PhotosType
}; export let setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessACType => ({ type: 'profile/SET_PHOTO_SUCCESS', photos })

type ActionsTypes = SendPostACType | SetUserProfileACType | SetStatusACType | SetPhotoSuccessACType;
type getStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;

export let setProfile = (userId: number | null) => async (dispatch: DispatchType) => {
  let profileData = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(profileData));
}

export let getStatus = (userId: number) => async (dispatch: DispatchType) => {
  let status = await profileAPI.getStatus(userId);
  dispatch(setStatus(status));
}

export let updateStatus = (status: string) => async (dispatch: DispatchType) => {
  let resultCode = await profileAPI.updateStatus(status);
  if (resultCode === 0) {
    dispatch(setStatus(status));
  }
}

export let savePhoto = (file: any) => async (dispatch: DispatchType) => {
  let response = await profileAPI.savePhoto(file);
  if (response.resultCode === 0) {
    dispatch(setPhotoSuccess(response.data))
  }
}

export let saveProfile = (profileData: ProfileType) => async (dispatch: any, getState: getStateType) => {
  let userId = getState().auth.id;
  let response = await profileAPI.saveProfile(profileData);
  if (response.resultCode === 0) {
    dispatch(setProfile(userId));
  }
  else {
    let error = saveProfileErrorProcessing(response.messages[0]);
    debugger;
    dispatch(stopSubmit('editProfile', { 'contacts': error }));
    debugger;
    return Promise.reject(response.messages[0]);
  }
}

function saveProfileErrorProcessing(e: any) {
  let saveE = e;
  let obj: any = {};
  debugger
  for (let i = 0; i < e.length; i++) {
    if (e[i] === '>') {
      debugger;
      e = e.slice(i + 1, e.length - 1).toLowerCase();
      i = e.length;
    }
  }
  debugger
  obj[e] = saveE;
  return obj;
}








