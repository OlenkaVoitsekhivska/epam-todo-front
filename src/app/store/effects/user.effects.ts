import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';

import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

import { catchError, concatMap, map, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const USER = 'user';

@Injectable()
export class UserEffects {
  // addUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.Signup),
  //     switchMap(({ user }) =>
  //       this.authService.handleSignup(user).pipe(
  //         tap(() => this.router.navigate([`/login`])),
  //         map((user) => UserActions.SignupSuccess({ user }))
  //       )
  //     )
  //   )
  // );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.Signup),
      switchMap(({ user }) =>
        this.authService.handleSignup(user).pipe(
          // tap((user) => {
          //   if (user) {
          //     this.router.navigate([`/login`]);
          //   }
          // }),
          map((user) => {
            this.router.navigate([`/login`]);
            return UserActions.SignupSuccess({ user });
          })
        )
      )
    )
  );

  logUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ user }) =>
        this.authService.handleLogin(user).pipe(
          tap((res) => {
            localStorage.setItem(USER, JSON.stringify(res));
            this.toastr.success('Welcome back');
            this.router.navigate([`/users/${res.id}/boards`]);
          }),
          map((user) => UserActions.loginSuccess({ user }))
        )
      )
    )
  );

  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      concatMap(() =>
        this.authService.handleLogout().pipe(
          tap(() => {
            localStorage.removeItem(USER);
            this.router.navigate(['login']);
          }),
          map(() => UserActions.logoutSuccess())
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
