import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EditBoardFormComponent } from './editBoard.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { updateBoard } from 'src/app/store/actions/boards.action';
import { mockSingleBoard } from 'src/mockData/boards/boards';

describe('Edit Board Component', () => {
  let fixture: ComponentFixture<EditBoardFormComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: EditBoardFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoardFormComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBoardFormComponent);
    store = TestBed.inject(MockStore);
    componentInstance = fixture.componentInstance;
    componentInstance.board = { ...mockSingleBoard };
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should render 2 inputs', () => {
    const inputEls = debugElement.queryAll(By.css('input'));
    expect(inputEls.length).toBe(2);
  });

  it('is expected that submit button is disabled if form is invalid', () => {
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

  it('is expected that submit button is enabled if form is valid', () => {
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
    nameInput.value = componentInstance.board.name;
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(componentInstance.editBoardForm.get('name')?.dirty).toBeTrue();
      const errornameMessageP =
        debugElement.nativeElement.querySelector('.error-message');
      expect(errornameMessageP.innerText.trim()).toBe(
        'Board name should contain at least 1 character'
      );
    });
  });

  it('should render p with error-message class if  description input is invalid', () => {
    const descriptionInput =
      debugElement.nativeElement.querySelector('#description');
    descriptionInput.value = componentInstance.board.description;
    descriptionInput.value = '';
    descriptionInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(
        componentInstance.editBoardForm.get('description')?.dirty
      ).toBeTrue();
      const errordescriptionMessageP =
        debugElement.nativeElement.querySelector('.error-message');
      expect(errordescriptionMessageP.innerText.trim()).toBe(
        'Board description should contain at least 1 character'
      );
    });
  });

  it('should dispatch action updateBoard onSubmit', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    const descriptionInput =
      debugElement.nativeElement.querySelector('#description');
    descriptionInput.value = 'description';
    descriptionInput.dispatchEvent(new Event('input'));
    const nameInput = debugElement.nativeElement.querySelector('#name');
    nameInput.value = 'board';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const formData = {
      name: nameInput.value,
      description: descriptionInput.value,
    };

    const form = debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', formData);
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateBoard({
        id: componentInstance.board.id,
        board: {
          ...componentInstance.board,
          ...formData,
        },
      })
    );
  });

  it('should emit true on close for handling in parent', () => {
    const closeBtn = debugElement.query(By.css('.btn-close'));
    closeBtn.triggerEventHandler('click');
    expect(componentInstance.closeModal).toBeTruthy();
  });

  it('should prepopulate input fields with @Input data', () => {
    expect(componentInstance.editBoardForm.get('name')?.value).toBe(
      componentInstance.board.name
    );
    expect(componentInstance.editBoardForm.get('description')?.value).toBe(
      componentInstance.board.description
    );
  });
});
