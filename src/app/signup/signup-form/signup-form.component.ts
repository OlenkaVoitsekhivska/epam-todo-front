import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Signup } from '../../store/actions/user.action';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const data = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone,
    };

    this.store.dispatch(Signup({ user: data }));
  }
}
