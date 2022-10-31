import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const GetTasks = createAction(
  '[Task] Get tasks',
  props<{ id: string }>()
);

export const GetTasksSuccess = createAction(
  '[Task] Get tasks success',
  props<{ tasks: Task[] }>()
);

export const AddTask = createAction(
  '[Task] Add task',
  props<{ task: any; boardId: string }>()
);

export const AddTaskSuccess = createAction(
  '[Task] Add task success',
  props<{ task: Task }>()
);

export const DeleteTask = createAction(
  '[Task] Delete task',
  props<{ id: string }>()
);

export const DeleteTaskSuccess = createAction(
  '[Task] Delete task success',
  props<{ id: string }>()
);

export const UpdateTask = createAction(
  '[Task] Update task',
  props<{ task: any }>()
);

export const UpdateTaskSuccess = createAction(
  '[Task] Update task success',
  props<{ task: any }>()
);

export const updateColor = createAction(
  '[Task] Update color',
  props<{ id: string; task: Partial<Task> }>()
);

export const updateColorSuccess = createAction(
  '[Task] Update color success',
  props<{ id: string; task: Partial<Task> }>()
);
