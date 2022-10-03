import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { UserI } from '../models/user.model';
import { loggedUserI } from '../models/loggedUser.model';

export const initialState: UserI[] = [];

export const UserReducer = createReducer(
  initialState,
  on(UserActions.SignupSuccess, (state, { user }) => [...state, user])
);

export const initialUserState: loggedUserI = {
  id: null,
  expiresIn: null,
  email: null,
  token: null,
};

export const CurrentUserReducer = createReducer(
  initialUserState,
  on(UserActions.LoginSuccess, (state, { user }) => user),
  on(UserActions.Logout, (state) => initialUserState)
);
