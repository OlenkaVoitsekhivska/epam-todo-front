import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { from, map, Observable, Subject, switchMap } from "rxjs";

import { BoardI } from "../models/board.model";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  private apiUrl = "http://localhost:3000/api/boards";

  constructor(private http: HttpClient) {}

  composeUrl(id: string): string {
    return `${this.apiUrl}/${id}`;
  }
  getBoards(id: string): Observable<BoardI[]> {
    const url = this.composeUrl(id);
    return this.http.get<BoardI[]>(url);
  }

  addBoard(board: BoardI, userId: string) {
    const url = this.composeUrl(userId);
    return this.http.post<BoardI>(url, board);
  }

  deleteBoard(id: string) {
    //compose url with id
    const url = this.composeUrl(id);

    return this.http.delete(url);
  }

  updateBoard(id: string, board: BoardI) {
    const url = this.composeUrl(id);
    return this.http.put(url, board);
  }
}
