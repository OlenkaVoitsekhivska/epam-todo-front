import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthService } from "src/app/services/auth.service";
import { Login } from "../../store/user.action";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store) {}

  loginForm!: FormGroup;

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    // this.authService.handleLogin(this.loginForm.value);
    this.store.dispatch(Login({ user: this.loginForm.value }));
    this.loginForm.reset();
  }
}
