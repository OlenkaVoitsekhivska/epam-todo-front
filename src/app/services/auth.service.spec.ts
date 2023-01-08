import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

import {
  mockLoggedUser,
  mockRegisteredUser,
} from 'src/mockData/user/mockLoggedUser';

import { environment } from './../../environments/environment.prod';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let url = `${environment.url}/users`;
  const successMessage = { message: 'user successfully logged out' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return registered user data on registration', () => {
    const registrationData = {
      email: 'abc@gmail.com',
      password: '1111',
      username: 'user',
      phone: '',
      isLogged: false,
    };

    service.handleSignup(registrationData).subscribe((res) => {
      expect(res).toEqual(mockRegisteredUser);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/signup`,
    });

    req.flush(mockRegisteredUser);
  });

  it('should return credentials of a logged user along with token', () => {
    const loginData = {
      email: 'abc@gmail.com',
      password: '1111',
    };

    service.handleLogin(loginData).subscribe((res) => {
      expect(res).toEqual(mockLoggedUser);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/login`,
    });

    req.flush(mockLoggedUser);
  });

  it('should return a successful logout message on logout', () => {
    service.handleLogout().subscribe((res) => {
      expect(res).toEqual(successMessage);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/logout`,
    });

    req.flush(successMessage);
  });
});
