import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
