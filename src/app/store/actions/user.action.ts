import { createAction, props } from '@ngrx/store';
import { Auth } from '../../models/auth';
import { User } from '../../models/user.model';
import { loggedUser } from '../../models/loggedUser.model';

export const Signup = createAction('[Users] Signup', props<{ user: any }>());

export const SignupSuccess = createAction(
  '[Users] Signup success',
  props<{ user: User }>()
);

export const Login = createAction(
  '[Users] Login',
  props<{ user: Partial<Auth> }>()
);

export const LoginSuccess = createAction(
  '[Users], Login success',
  props<{ user: loggedUser }>()
);

export const Logout = createAction('[Users] Logout');
export const LogoutSuccess = createAction('[Users] Logout Success');

export const GetCurrentUser = createAction('[Users] Get current user');
