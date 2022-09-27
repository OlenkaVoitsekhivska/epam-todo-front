import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, concatMap } from 'rxjs/operators';
import * as TaskActions from './tasks.action';

import { TaskService } from '../services/tasks.service';
import { Injectable } from '@angular/core';
import { TaskI } from '../models/task.model';

@Injectable()
export class TaskEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.GetTasks),
      switchMap(() => {
        return this.taskService
          .getTasks()
          .pipe(
            map((tasks: TaskI[]) => TaskActions.GetTasksSuccess({ tasks }))
          );
      })
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.AddTask),
      concatMap(({ task }) =>
        this.taskService
          .addTask(task)
          .pipe(map(() => TaskActions.AddATaskSuccess()))
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.DeleteTask),
      concatMap(({ id }) =>
        this.taskService
          .deleteTask(id)
          .pipe(map(() => TaskActions.DeleteTaskSuccess()))
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.UpdateTask),
      concatMap(({ task }) =>
        this.taskService
          .updateTask(task)
          .pipe(map(() => TaskActions.UpdateTaskSuccess()))
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
