import { createAction, props } from '@ngrx/store';
import {TaskI} from '../models/task.model';

export const GetTasks = createAction(
'[Task] Get tasks'
)

export const GetTasksSuccess = createAction(
  '[Task] Get tasks success',
  props<{tasks: TaskI[]}>()
)

export const AddTask = createAction(
  '[Task] Add task',
  props<{task: TaskI}>()
)

export const AddATaskSuccess = createAction(
  '[Task] Add task success',
)

export const DeleteTask = createAction(
  '[Task] Delete task',
  props<{id:string}>()
)

export const DeleteTaskSuccess = createAction(
  '[Task] Delete task success' 
)

export const UpdateTask = createAction(
  '[Task] Update task',
  props<{task:TaskI}>()
)

export const UpdateTaskSuccess = createAction(
  '[Task] Update task success'
)