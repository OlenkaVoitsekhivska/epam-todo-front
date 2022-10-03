import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { from, map, Observable, Subject, switchMap } from "rxjs";

import { TaskI } from "../models/task.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "http://localhost:3000/api/tasks";

  constructor(private http: HttpClient) {}

  composeUrl(id: string): string {
    return `${this.apiUrl}/${id}`;
  }
  getTasks(id: string): Observable<TaskI[]> {
    const url = this.composeUrl(id);
    return this.http.get<TaskI[]>(url);
  }

  addTask(task: any, boardId: string) {
    const url = this.composeUrl(boardId);
    return this.http.post(url, task);
  }

  deleteTask(id: string) {
    const url = this.composeUrl(id);
    return this.http.delete(url);
  }

  updateTask(id: string, task: TaskI) {
    const url = this.composeUrl(id);
    return this.http.put(url, task);
  }
}
