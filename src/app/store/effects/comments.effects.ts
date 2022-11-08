import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, tap } from 'rxjs/operators';

import * as CommentsActions from '../actions/comment.actions';

import { CommentsService } from '../../services/comments.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentsEffects {
  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.addComment),
      concatMap(({ taskId, comment }) =>
        this.commentsService.addComment(taskId, comment).pipe(
          map((comment: any) => {
            return CommentsActions.addCommentSuccess({ comment });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService
  ) {}
}
