import { getAuthUserData } from "./auth-reducer";

export type InitialStateType = {
  initialized: boolean
};
let initialState: InitialStateType = {
  initialized: false
};

let appReducer = (state = initialState, action: any): InitialStateType => {
  if (action.type === 'app/INITIALIZED_SUCCESS') return {
    ...state,
    initialized: true
  }
  return { ...state }
}; export default appReducer;

type InitializedSuccessActionType = {
  type: 'app/INITIALIZED_SUCCESS'
}

export let initializedSuccess = (): InitializedSuccessActionType => ({ type: 'app/INITIALIZED_SUCCESS' });

export let initializeApp = () => async (dispatch: any) => {
  dispatch(getAuthUserData())
  dispatch(initializedSuccess());
}