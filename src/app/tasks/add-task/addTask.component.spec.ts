import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { AddTaskFormComponent } from './addTask.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Add task component', () => {
  let fixture: ComponentFixture<AddTaskFormComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: AddTaskFormComponent;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskFormComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskFormComponent);
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
    expect(inputEls.length).toBe(2);
  });

  it('should disable submit btn if form is invalid', async () => {
    const nameInput = debugElement.nativeElement.querySelector('#name');
    nameInput.value = '';
    fixture.detectChanges();

    const signupButton = debugElement.query(
      By.css('[data-testid="addtask-btn"]')
    );
    fixture.whenStable().then(() => {
      expect(signupButton.properties['disabled']).toBeTrue();
    });
  });

  it('should enable submit btn if form is valid', async () => {
    const formWithImg = new FormData();
    formWithImg.set('name', 'task name');
    const signupButton = debugElement.query(
      By.css('[data-testid="addtask-btn"]')
    );
    fixture.whenStable().then(() => {
      expect(signupButton.properties['disabled']).toBeFalse();
    });
  });

  it('should receive status input', () => {
    const formWithImg = new FormData();
    componentInstance.status = 'Todo';
    formWithImg.set('status', componentInstance.status);
    expect(formWithImg.get('status')).toBe('Todo');
  });
});
