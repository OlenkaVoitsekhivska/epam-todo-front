import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, concatMap } from 'rxjs/operators';
import * as TaskActions from './tasks.action';

import { TaskService } from '../services/tasks.service';
import { Injectable } from '@angular/core';
import { TaskI } from '../models/task.model';
import { AddTaskI } from '../models/addTask.model';

@Injectable()
export class TaskEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.GetTasks),
      switchMap(({ id }) => {
        return this.taskService
          .getTasks(id)
          .pipe(
            map((tasks: TaskI[]) => TaskActions.GetTasksSuccess({ tasks }))
          );
      })
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.AddTask),
      concatMap(({ task, boardId }) =>
        this.taskService
          .addTask(task, boardId)
          .pipe(map((task: any) => TaskActions.AddTaskSuccess({ task })))
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.DeleteTask),
      concatMap(({ id }) =>
        this.taskService
          .deleteTask(id)
          .pipe(map(() => TaskActions.DeleteTaskSuccess({ id })))
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.UpdateTask),
      concatMap(({ id, task }) =>
        this.taskService
          .updateTask(id, task)
          .pipe(map(() => TaskActions.UpdateTaskSuccess()))
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
