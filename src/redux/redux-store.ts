import authReducer from "./auth-reducer";
import messagesReducer from "./messages-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

let rootResucer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
})

type rootResucerType = typeof rootResucer;
export type AppStateType = ReturnType<rootResucerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootResucer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.store = store
export default store;