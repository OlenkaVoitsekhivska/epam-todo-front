import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';

export const initialState = {};

export const CurrentUserReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { user }) => user),
  on(UserActions.logout, (state) => initialState),
  on(
    UserActions.getCurrentUser,
    (state) => (state = JSON.parse(localStorage.getItem('user') || '{}'))
  )
);
