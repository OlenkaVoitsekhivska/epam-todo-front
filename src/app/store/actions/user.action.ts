import { createAction, props } from '@ngrx/store';
import { Auth } from '../../models/auth';
import { User } from '../../models/user.model';
import { loggedUser } from '../../models/loggedUser.model';

export const Signup = createAction('[Users] Signup', props<{ user: any }>());

export const SignupSuccess = createAction(
  '[Users] Signup success',
  props<{ user: User }>()
);

export const login = createAction(
  '[Users] Login',
  props<{ user: Partial<Auth> }>()
);

export const loginSuccess = createAction(
  '[Users], login success',
  props<{ user: loggedUser }>()
);

export const logout = createAction('[Users] logout');
export const logoutSuccess = createAction('[Users] logout Success');

export const getCurrentUser = createAction('[Users] Get current user');
