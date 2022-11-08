import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const GetTasks = createAction(
  '[Task] Get tasks',
  props<{ id: string }>()
);

export const getTasksSuccess = createAction(
  '[Task] Get tasks success',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Task] Add task',
  props<{ task: FormData; boardId: string }>()
);

export const addTaskSuccess = createAction(
  '[Task] Add task success',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task] Delete task',
  props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete task success',
  props<{ id: string }>()
);

export const updateTask = createAction(
  '[Task] Update task',
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  '[Task] Update task success',
  props<{ task: any }>()
);

export const clearState = createAction('[Task] clear state');
