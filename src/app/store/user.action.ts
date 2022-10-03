import { createAction, createFeature, props } from '@ngrx/store';

import { SignupI } from '../models/signup';
import { LoginI } from '../models/login';
import { UserI } from '../models/user.model';
import { loggedUserI } from '../models/loggedUser.model';

export const Signup = createAction('[Users] Signup', props<{ user: any }>());

export const SignupSuccess = createAction(
  '[Users] Signup success',
  props<{ user: UserI }>()
);

export const Login = createAction('[Users] Login', props<{ user: LoginI }>());

export const LoginSuccess = createAction(
  '[Users], Login success',
  props<{ user: loggedUserI }>()
);

export const Logout = createAction(
  '[Users] Logout'
  // props<{ id: string }>()
);
export const LogoutSuccess = createAction(
  '[Users] Logout'
  // props<{ id: string }>()
);
