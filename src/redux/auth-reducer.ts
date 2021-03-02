import { stopSubmit } from 'redux-form';
import { securityAPI, authAPI } from '../api/api';

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null
}; type InitialStateType = typeof initialState;


let authReducer = (state = initialState, action: any): InitialStateType => {
  if (action.type === 'auth/SET_USER_DATA') {
    return { ...state, ...action.data, isAuth: action.isAuth }
  }
  else if (action.type === 'auth/GET_CAPTCHA_URL_SUCCESS') {
    return { ...state, captchaURL: action.captchaURL }
  }

  else return state
}
export default authReducer;


type SetAuthUserDataActionType = {
  type: 'auth/SET_USER_DATA'
  data: any
  isAuth: boolean
}; export let setAuthUserData = (data: any, isAuth: boolean): SetAuthUserDataActionType => ({ type: 'auth/SET_USER_DATA', data, isAuth });

type GetCaptchaURlSuccessActionType = {
  type: 'auth/GET_CAPTCHA_URL_SUCCESS'
  captchaURL: string
}; export let getCaptchaURlSuccess = (captchaURL: string): GetCaptchaURlSuccessActionType =>
  ({ type: 'auth/GET_CAPTCHA_URL_SUCCESS', captchaURL });


export let getAuthUserData = () => async (dispatch: any) => {
  let response = await authAPI.me();
  if (response.resultCode === 0) dispatch(setAuthUserData(response.data, true));
}

export let login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.resultCode === 0) dispatch(getAuthUserData())
  else {
    let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
    dispatch(stopSubmit('login', { _error: message }));
    if (response.resultCode === 10) {
      dispatch(getCaptchaURl());
    }
  }
}

export let logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();
  if (response.resultCode === 0) dispatch(setAuthUserData({ id: null, email: null, login: null }, false));
}

export let getCaptchaURl = () => async (dispatch: any) => {
  let response = await securityAPI.getCaptchaURl();
  let captchaURL = response.data.url;
  dispatch(getCaptchaURlSuccess(captchaURL));
}