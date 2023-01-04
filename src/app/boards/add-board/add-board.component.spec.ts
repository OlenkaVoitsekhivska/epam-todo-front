import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddBoardFormComponent } from './addBoard.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { addBoard } from 'src/app/store/actions/boards.action';

describe('Add Board Component', () => {
  let fixture: ComponentFixture<AddBoardFormComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: AddBoardFormComponent;
  const initialState = { boards: [] };

  // Arrange
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoardFormComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBoardFormComponent);
    store = TestBed.inject(MockStore);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should render 2 inputs', () => {
    const inputEls = debugElement.queryAll(By.css('input'));
    expect(inputEls.length).toBe(2);
  });

  it('should disable submit btn if form is invalid', () => {
    const nameInput = debugElement.nativeElement.querySelector('#name');
    const descriptionInput =
      debugElement.nativeElement.querySelector('#description');
    nameInput.value = '';
    descriptionInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const btnEl = debugElement.nativeElement.querySelector(
        '[data-btn="submit-btn"]'
      );
      expect(btnEl.disabled).toBeTrue();
    });
  });

  it('should enable submit btn if form is valid', () => {
    const nameInput = debugElement.nativeElement.querySelector('#name');
    const descriptionInput =
      debugElement.nativeElement.querySelector('#description');
    nameInput.value = 'board';
    descriptionInput.value = 'teamwork';
    nameInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const btnEl = debugElement.nativeElement.querySelector(
        '[data-btn="submit-btn"]'
      );
      expect(btnEl.disabled).toBeFalse();
    });
  });

  it('should render p with error-message class if  name input is invalid', () => {
    const nameInput = debugElement.nativeElement.querySelector('#name');
    nameInput.value = 'woah';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(componentInstance.addBoardForm.get('name')?.dirty).toBeTrue();
      const errornameMessageP =
        debugElement.nativeElement.querySelector('.error-message');
      expect(errornameMessageP.innerText.trim()).toBe(
        'Task name should contain at least 1 character'
      );
    });
  });

  it('should render p with error-message class if  description input is invalid', () => {
    const descriptionInput =
      debugElement.nativeElement.querySelector('#description');
    descriptionInput.value = 'woah';
    descriptionInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    descriptionInput.value = '';
    descriptionInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(
        componentInstance.addBoardForm.get('description')?.dirty
      ).toBeTrue();
      const errordescriptionMessageP =
        debugElement.nativeElement.querySelector('.error-message');
      expect(errordescriptionMessageP.innerText.trim()).toBe(
        'Description should contain at least 1 character'
      );
    });
  });

  it('should dispatch action addBoard onSubmit', () => {
    componentInstance.currentUser = '123';
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    const descriptionInput =
      debugElement.nativeElement.querySelector('#description');
    descriptionInput.value = 'woah';
    const nameInput = debugElement.nativeElement.querySelector('#name');
    nameInput.value = 'woah';

    debugElement.query(By.css('form')).triggerEventHandler('submit', {
      name: nameInput.value,
      description: descriptionInput.value,
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      addBoard({
        board: componentInstance.addBoardForm.value,
        userId: componentInstance.currentUser,
      })
    );
  });

  it('should emit true on close for handling in parent', () => {
    const closeBtn = debugElement.query(By.css('.btn-close'));
    closeBtn.triggerEventHandler('click');
    expect(componentInstance.closeModal).toBeTruthy();
  });
});
