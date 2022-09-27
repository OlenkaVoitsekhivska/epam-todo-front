import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './tasks.action';
import {tasks} from '../tasks/tasks'
import { GetBoardsSuccess } from './boards.action';
import {TaskI} from '../models/task.model';

export const initialState:TaskI[]=[];

export const TasksReducer = createReducer(
initialState,
on(TaskActions.GetTasksSuccess, (state, {tasks})=>tasks),
on(TaskActions.AddTask,TaskActions.UpdateTask, (state, {task})=>[...state,task]),
on(TaskActions.DeleteTask, (state, {id})=>state.filter(task=>task.id!==id)),
on(TaskActions.GetTasks, TaskActions.AddATaskSuccess, TaskActions.DeleteTaskSuccess, TaskActions.UpdateTaskSuccess, state => state)
)