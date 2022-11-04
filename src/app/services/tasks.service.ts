import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Task } from '../models/task.model';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  composeUrl(id: string): string {
    return `${this.apiUrl}/tasks/${id}`;
  }
  getTasks(id: string): Observable<Task[]> {
    const url = this.composeUrl(id);
    return this.http.get<Task[]>(url);
  }

  addTask(task: any, boardId: string) {
    const url = this.composeUrl(boardId);
    return this.http.post<Task>(url, task);
  }

  deleteTask(id: string) {
    const url = this.composeUrl(id);
    return this.http.delete(url);
  }

  updateTask(task: any) {
    const url = this.composeUrl(task.id);
    return this.http.put<Task>(url, task);
  }
}
