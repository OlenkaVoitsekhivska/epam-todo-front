import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TaskService } from './tasks.service';

import {
  mockCreatedSingleTask,
  mockTasks,
  mockUpdatedTask,
} from 'src/mockData/tasks/tasks';

import { StatusE } from '../models/task.model';

import { environment } from './../../environments/environment.prod';

describe('TasksService', () => {
  let service: TaskService;
  let httpController: HttpTestingController;
  let form: FormData;
  let url = environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TaskService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of tasks on get request', () => {
    const id = 'b-1';

    service.getTasks(id).subscribe((res) => {
      expect(res).toEqual(mockTasks);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/tasks/${id}`,
    });

    req.flush(mockTasks);
  });

  it('should return a newly created task on addTask request', () => {
    const id = 'b-1';
    const newTask = new FormData();
    newTask.append('image', '');
    newTask.append('name', 'task1');
    newTask.append('status', StatusE.TODO);
    newTask.append('boardId', 'b-1');

    service.addTask(newTask, id).subscribe((res) => {
      expect(res).toEqual(mockCreatedSingleTask);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/tasks/${id}`,
    });

    req.flush(mockCreatedSingleTask);
  });

  it('should return id of deleted task on deleteTask request', () => {
    const id = '1';
    service.deleteTask(id).subscribe((res) => {
      expect(res).toEqual(id);
    });
    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/tasks/${id}`,
    });

    req.flush(id);
  });

  it('should return updated task on updateTask request', () => {
    const id = '1';
    service.updateTask(mockUpdatedTask).subscribe((res) => {
      expect(res).toEqual(mockUpdatedTask);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/tasks/${id}`,
    });

    req.flush(mockUpdatedTask);
  });
});
