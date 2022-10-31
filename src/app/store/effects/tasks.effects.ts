import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import * as TaskActions from '../actions/tasks.action';
import * as CommentsActions from '../actions/comment.actions';

import { TaskService } from '../../services/tasks.service';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommentsService } from 'src/app/services/comments.service';

@Injectable()
export class TaskEffects {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.GetTasks),
      switchMap(({ id }) => {
        return this.taskService
          .getTasks(id)
          .pipe(map((tasks: Task[]) => TaskActions.GetTasksSuccess({ tasks })));
      })
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.AddTask),
      concatMap(({ task, boardId }) =>
        this.taskService
          .addTask(task, boardId)
          .pipe(map((task: Task) => TaskActions.AddTaskSuccess({ task })))
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
      mergeMap(({ task }) => {
        return this.taskService.updateTask(task).pipe(
          map((task) => {
            return TaskActions.UpdateTaskSuccess({ task });
          })
        );
      })
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.DeleteComment),
      switchMap(({ id }) =>
        this.commentsService
          .deleteComment(id)
          .pipe(map(() => CommentsActions.DeleteCommentSuccess({ id })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private commentsService: CommentsService
  ) {}
}
