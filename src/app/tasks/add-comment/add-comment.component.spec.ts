import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { mockCreatedSingleTask } from 'src/mockData/tasks/tasks';
import { addComment } from 'src/app/store/actions/comment.actions';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let store: MockStore;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCommentComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCommentComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.task = { ...mockCreatedSingleTask };

    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit btn if form is invalid', async () => {
    const submitBtn = debugElement.query(
      By.css('[data-testid="submitComment-btn"]')
    );
    expect(submitBtn.properties['disabled']).toBeTrue();
  });

  it('should dispatch addComment', async () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const newComment = 'new comment';
    component.addCommentForm.setValue({ name: newComment });
    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      addComment({
        taskId: component.task.id,
        comment: component.addCommentForm.value,
      })
    );
  });
});
