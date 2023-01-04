import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Board, UpdateColor } from '../models/board.model';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  composeUrl(id: string): string {
    return `${this.apiUrl}/boards/${id}`;
  }
  getBoards(id: string): Observable<Board[]> {
    const url = this.composeUrl(id);
    return this.http.get<Board[]>(url);
  }

  getBoardById(id: string): Observable<Board> {
    const url = `${this.composeUrl(id)}/getTasks`;
    return this.http.get<Board>(url);
  }

  addBoard(board: Board, userId: string): Observable<Board> {
    const url = this.composeUrl(userId);
    return this.http.post<Board>(url, board);
  }

  deleteBoard(id: string): Observable<string> {
    const url = this.composeUrl(id);
    return this.http.delete<string>(url);
  }

  updateBoard(id: string, board: Partial<Board>): Observable<Board> {
    const url = this.composeUrl(id);
    return this.http.put<Board>(url, board);
  }

  updateColor(id: string, color: Partial<UpdateColor>): Observable<Board> {
    const url = this.composeUrl(id);
    return this.http.patch<Board>(url, color);
  }
}
