import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './edit-task.component';
import { mockCreatedSingleTask } from 'src/mockData/tasks/tasks';

describe('Edit task component', () => {
  let fixture: ComponentFixture<EditTaskComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: EditTaskComponent;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTaskComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskComponent);
    store = TestBed.inject(MockStore);
    componentInstance = fixture.componentInstance;
    componentInstance.task = { ...mockCreatedSingleTask };
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should render', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render 1 input', () => {
    const inputEls = debugElement.queryAll(By.css('input'));
    expect(inputEls.length).toBe(1);
  });

  it('should disable submit btn if form is invalid', async () => {
    const nameInput = debugElement.nativeElement.querySelector('#name');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const signupButton = debugElement.query(
      By.css('[data-testid="editTask-btn"]')
    );
    fixture.whenStable().then(() => {
      expect(signupButton.properties['disabled']).toBeTrue();
    });
  });

  it('should enable submit btn if form is valid', async () => {
    let newName = 'new name';
    const nameInput = debugElement.nativeElement.querySelector('#name');
    nameInput.value = newName;
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const signupButton = debugElement.query(
      By.css('[data-testid="editTask-btn"]')
    );
    fixture.whenStable().then(() => {
      expect(signupButton.properties['disabled']).toBeFalse();
    });
  });

  it('should receive task input and use teh data to populate name input field', () => {
    const prevName = componentInstance.task.name;
    expect(componentInstance.editTaskForm.get('name')?.value).toBe(prevName);
  });

  it('should emit true on close', async () => {
    componentInstance.closeModal.subscribe((val) => {
      expect(val).toBe(true);
    });
    componentInstance.close();
  });
});
