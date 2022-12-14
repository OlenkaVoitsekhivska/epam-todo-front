import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signup } from '../../store/actions/user.action';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
})
export class SignupFormComponent {
  constructor(private store: Store, private toastr: ToastrService) {}

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
