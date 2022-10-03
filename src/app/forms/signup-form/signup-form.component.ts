/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Store } from "@ngrx/store";
import { signupModalOpen } from "src/app/store/modal.action";
import { Signup } from "../../store/user.action";

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"],
})
export class SignupFormComponent implements OnInit {
  constructor(private authservice: AuthService, private store: Store) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const data = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone,
    };

    // this.authservice.handleSignup(data);
    this.store.dispatch(Signup({ user: data }));
  }
}
