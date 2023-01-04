import { DebugElement, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './tasks.component';
import {
  mockCreatedSingleTask,
  mockTasks,
  mockUpdatedTask,
} from 'src/mockData/tasks/tasks';
import { RouterTestingModule } from '@angular/router/testing';
import { GetTasks, deleteTask } from '../store/actions/tasks.action';
import { getBoardById, updateColor } from '../store/actions/board.action';
import { from, fromEvent, of } from 'rxjs';
import { StatusE } from '../models/task.model';
import { deleteComment } from '../store/actions/comment.actions';
import { mockSingleBoard } from 'src/mockData/boards/boards';

describe('Tasks component', () => {
  let fixture: ComponentFixture<TasksComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: TasksComponent;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    store = TestBed.inject(MockStore);
    componentInstance = fixture.componentInstance;

    debugElement = fixture.debugElement;
    componentInstance.currentBoard = '123';
    componentInstance.tasks$ = of(mockTasks);
    fixture.detectChanges();
  });

  it('should dispatch getTasks action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(
      GetTasks({ id: componentInstance.currentBoard })
    );
  });

  it('should dispatch getBoardById action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(
      getBoardById({ id: componentInstance.currentBoard })
    );
  });

  it('should render tasks to the view', async () => {
    let taskInView = debugElement.nativeElement.querySelectorAll('.task');
    fixture.whenStable().then(() => {
      componentInstance.tasks$.subscribe((res) => {
        expect(taskInView.length).toBe(res.length);
      });
    });
  });

  it('should render 3 columns', () => {
    let columnsInView = debugElement.nativeElement.querySelectorAll('.column');
    fixture.whenStable().then(() => {
      expect(columnsInView.length).toBe(3);
    });
  });
  it('should toggle addModal state to true on openAddTaskModal', async () => {
    componentInstance.openAddTaskModal(StatusE.TODO);
    expect(componentInstance.addModal).toBeTrue();
  });
  it('should toggle addModal state to false on onClose', async () => {
    componentInstance.openAddTaskModal(StatusE.TODO);
    componentInstance.onClose();
    expect(componentInstance.addModal).toBeFalse();
  });

  it('should toggle editModal state to true on onEdit', async () => {
    const task = { ...mockCreatedSingleTask };
    componentInstance.onEdit(task);
    expect(componentInstance.editModal).toBeTrue();
  });
  it('should toggle editModal state to false on onClose', async () => {
    const task = { ...mockCreatedSingleTask };
    componentInstance.onEdit(task);
    componentInstance.onClose();
    expect(componentInstance.editModal).toBeFalse();
  });

  it('should delete task on deleteTask', async () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const task = { ...mockCreatedSingleTask };
    componentInstance.deleteTask(task.id);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteTask({ id: task.id }));
  });

  it('should toggle addCommentModal to true on addComment', async () => {
    const task = { ...mockCreatedSingleTask };
    componentInstance.addComment(task);
    expect(componentInstance.addCommentModal).toBeTrue();
    expect(componentInstance.activeTask).toEqual(task);
  });

  it('should toggle addCommentModal to false on close', async () => {
    const task = { ...mockCreatedSingleTask };
    componentInstance.addComment(task);
    componentInstance.onClose();
    expect(componentInstance.addCommentModal).toBeFalse();
  });

  it('should dispatch deleteComment action on deleteComment', async () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const commentId = '123';
    componentInstance.deleteComment(commentId);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteComment({ id: commentId }));
  });

  it('should toggle comments visibility to true on toggleShowComments', async () => {
    const task = { ...mockCreatedSingleTask };
    componentInstance.toggleShowComments(task);
    expect(componentInstance.showComments.taskId).toBe(task.id);
    expect(componentInstance.showComments.show).toBeTrue();
  });

  it('should toggle comments visibility to false on toggleShowComments', async () => {
    const task = { ...mockCreatedSingleTask };
    componentInstance.toggleShowComments(task);
    componentInstance.toggleShowComments(task);
    expect(componentInstance.showComments.taskId).toBe(task.id);
    expect(componentInstance.showComments.show).toBeFalse();
  });

  it('should toggle showColorpicker to true on toggleColorpicker', async () => {
    const col = 'col1';
    componentInstance.toggleColorpicker(col);
    expect(componentInstance.showColorpicker[col]).toBeTrue();
  });

  it('should toggle showColorpicker to false on toggleColorpicker', async () => {
    const col = 'col1';
    componentInstance.toggleColorpicker(col);
    componentInstance.toggleColorpicker(col);
    expect(componentInstance.showColorpicker[col]).toBeFalse();
  });

  // it('should dispatch updateColor action', async () => {
  //   const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
  //   const board = { ...mockSingleBoard };
  //   const colorpicker = debugElement.nativeElement.querySelector(
  //     'input[type="color"]'
  //   );
  //   const column = 'col1';
  //   const inputStream = fromEvent(colorpicker, 'input');
  //   inputStream.subscribe((res) => {
  //     componentInstance.handleColorSwitch(
  //       board.id,
  //       column,
  //       colorpicker.triggerEventHandler('input', { value: '#fcba03' })
  //     );
  //     const data = { [column]: '#fcba03' };
  //     expect(dispatchSpy).toHaveBeenCalledWith(
  //       updateColor({ id: board.id, color: data })
  //     );
  //   });
  // });
});
