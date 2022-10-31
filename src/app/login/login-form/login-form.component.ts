import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../../store/actions/user.action';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store) {}

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(Login({ user: this.loginForm.value }));
    this.loginForm.reset();
  }
}
