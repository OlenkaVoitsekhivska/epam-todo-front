import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../store/actions/user.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private store: Store) {}

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.store.dispatch(Login({ user: this.loginForm.value }));
    this.loginForm.reset();
  }
}
