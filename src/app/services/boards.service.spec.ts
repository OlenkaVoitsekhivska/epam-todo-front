import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BoardService } from './boards.service';
import {
  mockBoards,
  mockSingleBoard,
  mockSingleUpdatedBoard,
  mockSingleUpdatedColorBoard,
} from 'src/mockData/boards/boards';

import { environment } from './../../environments/environment.prod';

describe('BoardService', () => {
  let service: BoardService;
  let httpController: HttpTestingController;
  let url = environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BoardService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of boards on get request', () => {
    const id = 'u-1';

    service.getBoards(id).subscribe((res) => {
      expect(res).toEqual(mockBoards);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/boards/${id}`,
    });

    req.flush(mockBoards);
  });

  it('should return a board with indicated id on getBoardById request', () => {
    const id = '1';

    service.getBoardById(id).subscribe((res) => {
      expect(res).toEqual(mockSingleBoard);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/boards/${id}/getTasks`,
    });

    req.flush(mockSingleBoard);
  });

  it('should return a newly created board on addBoard request', () => {
    const userId = 'u-1';
    service.addBoard(mockSingleBoard, userId).subscribe((res) => {
      expect(res).toEqual(mockSingleBoard);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/boards/${userId}`,
    });

    req.flush(mockSingleBoard);
  });

  it('should return id of a deleted board on deleteBoard request', () => {
    const id = '1';
    service.deleteBoard(id).subscribe((res) => {
      expect(res).toEqual(id);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/boards/${id}`,
    });

    req.flush(id);
  });

  it('should return updated board on updateBoard request', () => {
    const id = '1';
    service.updateBoard(id, mockSingleBoard).subscribe((res) => {
      expect(res).toEqual(mockSingleUpdatedBoard);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/boards/${id}`,
    });

    req.flush(mockSingleUpdatedBoard);
  });

  it('should return updated board on updateColor request', () => {
    const id = '1';
    const newColor = { col1: '#32a852' };
    service.updateColor(id, newColor).subscribe((res) => {
      expect(res).toEqual(mockSingleUpdatedColorBoard);
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${url}/boards/${id}`,
    });

    req.flush(mockSingleUpdatedColorBoard);
  });
});
