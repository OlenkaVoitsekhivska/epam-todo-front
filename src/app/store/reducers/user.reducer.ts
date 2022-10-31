import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';

export const initialUserState = {};

export const CurrentUserReducer = createReducer(
  initialUserState,
  on(UserActions.LoginSuccess, (state, { user }) => user),
  on(UserActions.Logout, (state) => initialUserState),
  on(
    UserActions.GetCurrentUser,
    (state) => (state = JSON.parse(localStorage.getItem('user') || '{}'))
  )
);
