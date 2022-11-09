import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Auth } from '../models/auth';
import { User } from '../models/user.model';
import { loggedUser } from '../models/loggedUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.url}/users`;

  private token: string | null = localStorage.getItem('user')
    ? localStorage.getItem('user')
    : null;

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  composeUrl(action: string) {
    return `${this.apiUrl}/${action}`;
  }

  handleSignup(req: Auth) {
    return this.http.post<User>(this.composeUrl('signup'), req);
  }

  handleLogin(req: Partial<Auth>) {
    return this.http.post<loggedUser>(this.composeUrl('login'), req);
  }

  handleLogout() {
    return this.http.get<{ message: string }>(this.composeUrl('logout'));
  }
  refetchUser() {
    return this.http.get<any>(this.composeUrl('current'));
  }
}
