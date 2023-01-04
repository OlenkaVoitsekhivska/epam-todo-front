import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './signup-form.component';
import { ToastrService } from 'ngx-toastr';
import { Signup } from 'src/app/store/actions/user.action';

describe('Login Component', () => {
  let fixture: ComponentFixture<SignupFormComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: SignupFormComponent;
  const initialState = {};
  const mockedToastrService = jasmine.createSpyObj('toastrService', ['error']);

  // Arrange
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [FormsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: ToastrService, useValue: mockedToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    store = TestBed.inject(MockStore);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    mockedToastrService.error.and.returnValue('Passwords do not match');
  });

  it('should render', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render 5 inputs', () => {
    const inputEls = debugElement.queryAll(By.css('input'));
    expect(inputEls.length).toBe(5);
  });

  describe('submit btn', () => {
    interface Form {
      username: any;
      email: any;
      password: any;
      passwordRep: any;
      phone: any;
    }
    let form: Form;
    let invalidFormData: Form;
    let validFormData: Form;

    beforeEach(() => {
      form = {
        username: debugElement.nativeElement.querySelector('#username'),
        email: debugElement.nativeElement.querySelector('#email'),
        password: debugElement.nativeElement.querySelector('#password'),
        passwordRep: debugElement.nativeElement.querySelector('#passwordRep'),
        phone: debugElement.nativeElement.querySelector('#phone'),
      };

      invalidFormData = {
        username: '',
        email: '',
        password: '',
        passwordRep: '',
        phone: '',
      };

      validFormData = {
        username: 'zef',
        email: 'abc@gmail.com',
        password: '1111',
        passwordRep: '1111',
        phone: '',
      };
    });

    it('should disable submit btn if form is invalid', () => {
      form.username.value = invalidFormData.username;
      form.email.value = invalidFormData.email;
      form.password.value = invalidFormData.password;
      form.passwordRep.value = invalidFormData.passwordRep;
      form.phone.value = invalidFormData.phone;

      form.username.dispatchEvent(new Event('input'));
      form.email.dispatchEvent(new Event('input'));
      form.password.dispatchEvent(new Event('input'));
      form.passwordRep.dispatchEvent(new Event('input'));
      form.phone.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const signupButton = debugElement.query(
        By.css('[data-testid="signup-btn"]')
      );

      expect(signupButton.properties['disabled']).toBeTrue();
    });

    it('should enable submit btn if form is valid', () => {
      form.username.value = validFormData.username;
      form.email.value = validFormData.email;
      form.password.value = validFormData.password;
      form.passwordRep.value = validFormData.passwordRep;
      form.phone.value = validFormData.phone;

      form.username.dispatchEvent(new Event('input'));
      form.email.dispatchEvent(new Event('input'));
      form.password.dispatchEvent(new Event('input'));
      form.passwordRep.dispatchEvent(new Event('input'));
      form.phone.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const signupButton = debugElement.query(
        By.css('[data-testid="signup-btn"]')
      );

      expect(signupButton.properties['disabled']).toBeFalse();
    });

    it('should dispatch action login onSubmit', () => {
      const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store

      form.username.value = validFormData.username;
      form.email.value = validFormData.email;
      form.password.value = validFormData.password;
      form.passwordRep.value = validFormData.passwordRep;
      form.phone.value = validFormData.phone;

      form.username.dispatchEvent(new Event('input'));
      form.email.dispatchEvent(new Event('input'));
      form.password.dispatchEvent(new Event('input'));
      form.passwordRep.dispatchEvent(new Event('input'));
      form.phone.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      debugElement
        .query(By.css('form'))
        .triggerEventHandler('submit', { validFormData });

      expect(dispatchSpy).toHaveBeenCalledWith(
        Signup({
          user: {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
            phone: form.phone.value,
          },
        })
      );
    });

    it('should show toast with error if password and passwordRep input values do not match', () => {
      form.username.value = validFormData.username;
      form.email.value = validFormData.email;
      form.password.value = validFormData.password;
      form.passwordRep.value = '1234';
      form.phone.value = validFormData.phone;

      form.username.dispatchEvent(new Event('input'));
      form.email.dispatchEvent(new Event('input'));
      form.password.dispatchEvent(new Event('input'));
      form.passwordRep.dispatchEvent(new Event('input'));
      form.phone.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      debugElement.query(By.css('form')).triggerEventHandler('submit', {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
        passwordRep: form.passwordRep.value,
        phone: form.phone.value,
      });

      expect(mockedToastrService.error).toHaveBeenCalled();
    });
  });
});
