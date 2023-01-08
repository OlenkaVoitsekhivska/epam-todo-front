import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginFormComponent } from './login-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { login } from 'src/app/store/actions/user.action';

describe('Login Component', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: LoginFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    store = TestBed.inject(MockStore);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should render', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render 2 inputs', () => {
    const inputEls = debugElement.queryAll(By.css('input'));
    expect(inputEls).toBeTruthy();
  });

  it('should disable submit btn if form is invalid', () => {
    const formData = {
      email: '',
      password: '',
    };
    componentInstance.loginForm.setValue(formData);
    fixture.detectChanges();

    const loginButton = debugElement.query(By.css('[data-testid="login-btn"]'));

    expect(loginButton.properties['disabled']).toBeTrue();
  });

  it('should enable submit btn if form is valid', () => {
    const formData = {
      email: 'abc@gmail.com',
      password: '1111',
    };
    componentInstance.loginForm.setValue(formData);
    fixture.detectChanges();

    const loginButton = debugElement.query(By.css('[data-testid="login-btn"]'));

    expect(loginButton.properties['disabled']).toBeFalse();
  });

  it('should render error message if email is invalid', () => {
    const emailInput = debugElement.nativeElement.querySelector('#email');
    emailInput.value = 'abc';
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorEmailMessageP =
      debugElement.nativeElement.querySelector('.error-message');

    fixture.whenStable().then(() => {
      expect(componentInstance.loginForm.dirty).toBeTrue();
      expect(errorEmailMessageP.innerText.trim()).toBe('Invalid email');
    });
  });

  it('should render error message if password is invalid', () => {
    const passwordInput = debugElement.nativeElement.querySelector('#password');
    passwordInput.value = '111';
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorEmailMessageP =
      debugElement.nativeElement.querySelector('.error-message');

    fixture.whenStable().then(() => {
      expect(componentInstance.loginForm.dirty).toBeTrue();
      expect(errorEmailMessageP.innerText.trim()).toBe(
        'Make sure to enter your password'
      );
    });
  });

  it('should dispatch action login onSubmit', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    const formData = {
      email: 'abc@gmail.com',
      password: '1111',
    };

    componentInstance.loginForm.setValue(formData);

    fixture.detectChanges();

    debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', componentInstance.loginForm.value);

    expect(dispatchSpy).toHaveBeenCalledWith(
      login({
        user: componentInstance.loginForm.value,
      })
    );
  });
});
