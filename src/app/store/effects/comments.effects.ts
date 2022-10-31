import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, tap } from 'rxjs/operators';

import * as CommentsActions from '../actions/comment.actions';

import { CommentsService } from '../../services/comments.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentsEffects {
  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.AddComment),
      concatMap(({ taskId, comment }) =>
        this.commentsService.addComment(taskId, comment).pipe(
          tap((comment) => console.log('thsi is comment from effect', comment)),
          map((comment: any) => {
            return CommentsActions.AddCommentSuccess({ comment });
          })
        )
      )
    )
  );

  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.GetComments),
      concatMap(({ boardId }) => {
        return this.commentsService
          .getComments(boardId)
          .pipe(
            map((comments) => CommentsActions.GetCommentsSuccess({ comments }))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService
  ) {}
}
