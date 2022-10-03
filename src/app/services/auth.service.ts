import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment.prod';
import { SignupI } from '../models/signup';
import { UserI } from '../models/user.model';
import { LoginI } from '../models/login';
import { loggedUserI } from '../models/loggedUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = `${environment.apiUrl}/users`;
  private apiUrl = `http://localhost:3000/api/users`;
  private token: string | null = localStorage.getItem('user')
    ? localStorage.getItem('user')
    : null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getToken() {
    return this.token;
  }

  composeUrl(action: string) {
    return `${this.apiUrl}/${action}`;
  }

  handleSignup(req: SignupI) {
    return this.http.post<UserI>(this.composeUrl('signup'), req);
    // .subscribe(() => {
    //   this.toastr.success("You have successfully signed up!");
    //   this.router.navigate(["/login"]);
    // });
  }

  handleLogin(req: LoginI) {
    return this.http.post<loggedUserI>(this.composeUrl('login'), req);
    // .subscribe((response) => {
    //   this.token = response.token;
    //   localStorage.setItem("token", this.token);
    //   setTimeout(() => {
    //     this.handleLogout();
    //   }, response.expiresIn * 1000);
    //   this.loginStatusListener.next(true);
    //   this.isLogged = true;
    //   this.toastr.success("Welcome back");
    //   this.router.navigate(["/boards"]);
    // });
  }

  handleLogout() {
    // localStorage.removeItem("token");
    return this.http.get<{ message: string }>(this.composeUrl('logout'));
    // .subscribe(() => {
    //   this.token = null;
    //   this.loginStatusListener.next(false);
    //   this.isLogged = false;
    //   this.toastr.success("Bye, see you later:)");
    //   this.router.navigate(["/home"]);
    // });
  }
}
