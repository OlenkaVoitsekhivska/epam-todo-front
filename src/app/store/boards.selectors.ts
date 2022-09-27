import { createSelector } from '@ngrx/store';
// import { tasks } from '../tasks/tasks';
import { TaskI } from '../models/task.model';
import {BoardI} from '../models/board.model'

export const selectBoard = (state: any) => state.currentBoard;
export const selectAllTasks = (state: any) => state.tasks;


const board = createSelector(selectBoard, state => state.currentBoard);
const tasks = createSelector(selectAllTasks, state => state.tasks);

export const selectBoardTasks = createSelector(board, tasks, (board, tasks) => {
  return tasks.filter(task=>{
    return task.boardId===board
  })
});

