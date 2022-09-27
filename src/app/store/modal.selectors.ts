import { createSelector } from '@ngrx/store';
import {tasks} from '../tasks/tasks';
import {TaskI} from '../models/task.model'

 
export const showBoardModalSelector = (state:any) => state.showBoardModal;

 
