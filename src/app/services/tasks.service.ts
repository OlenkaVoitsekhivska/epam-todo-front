import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { from, map, Observable, Subject, switchMap } from 'rxjs';


import {TaskI} from '../models/task.model'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  composeUrl(id: string): string {
    return `${this.apiUrl}/${id}`;
  }
  getTasks(): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(this.apiUrl);
  }

  addTask(task: TaskI) {
    return this.http.post<TaskI>(this.apiUrl, task);
  }

  deleteTask(id:string){
    //compose url with id
    return this.http.delete(this.apiUrl)
  }

  updateTask(task:TaskI){
    return this.http.put(this.apiUrl, task)
  }

}