import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { from, map, Observable, Subject, switchMap } from 'rxjs';


import {BoardI} from '../models/board.model'

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:3000/api/boards';

  constructor(private http: HttpClient) {}

  composeUrl(id: string): string {
    return `${this.apiUrl}/${id}`;
  }
  getBoards(): Observable<BoardI[]> {
    return this.http.get<BoardI[]>(this.apiUrl);
  }

  addBoard(board: BoardI) {
    return this.http.post<BoardI>(this.apiUrl, board);
  }

  deleteBoard(id:string){
    //compose url with id
    const url = this.composeUrl(id);
  
    return this.http.delete(url)
  }

  updateBoard(board:BoardI){
    return this.http.put(this.apiUrl, board)
  }

}