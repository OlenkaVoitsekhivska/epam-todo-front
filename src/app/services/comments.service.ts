import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = environment.url;
  constructor(private http: HttpClient) {}

  composeUrl(taskId: string): string {
    return `${this.apiUrl}/comments/${taskId}`;
  }

  addComment(taskId: string, comment: any) {
    const url = this.composeUrl(taskId);
    return this.http.post(url, { comment });
  }
  getComments(boardId: string) {
    const url = this.composeUrl(boardId);
    return this.http.get(url);
  }

  deleteComment(id: string) {
    const url = this.composeUrl(id);
    return this.http.delete(url);
  }
}
