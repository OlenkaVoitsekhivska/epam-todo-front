import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signup } from '../../store/actions/user.action';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.value.password !== form.value.passwordRep) {
      this.toastr.error('Passwords do not match', 'Error', {
        timeOut: 3000,
      });
      return;
    }
    const data = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone,
    };

    this.store.dispatch(Signup({ user: data }));
  }
}
