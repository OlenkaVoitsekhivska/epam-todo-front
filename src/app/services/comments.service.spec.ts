import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { mockComments } from 'src/mockData/comments/comments';

import { CommentsService } from './comments.service';
import { environment } from 'src/environments/environment.prod';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpController: HttpTestingController;
  let url = environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommentsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return newly created comment on addComment request', () => {
    const id = 't-1';
    const comment = 'comment';
    const mockComment = {
      id: 'c-1',
      name: 'comment',
      taskId: 't-1',
      createdAt: new Date('October 31, 2022 03:24:00'),
    };

    service.addComment(id, comment).subscribe((res) => {
      expect(res).toEqual(mockComment);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/comments/${id}`,
    });

    req.flush(mockComment);
  });

  it('should return an array of comments on get request', () => {
    const id = 'b-1';

    service.getComments(id).subscribe((res) => {
      expect(res).toEqual(mockComments);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/comments/${id}`,
    });

    req.flush(mockComments);
  });

  it('should return id of a deleted comment on deleteComment request', () => {
    const id = 'c-1';

    service.deleteComment(id).subscribe((res) => {
      expect(res).toEqual(id);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/comments/${id}`,
    });

    req.flush(id);
  });
});
