import { Component, OnInit } from '@angular/core';
import { BoardI } from '../models/board.model';
import { boards } from './boards';
import { Store } from '@ngrx/store';
import { SetCurrentBoard, GetBoards, DeleteBoard } from '../store/boards.action';
import { showBoardModalSelector } from '../store/modal.selectors';
import { modalOpen, modalClose } from '../store/modal.action';
import { Observable } from 'rxjs';
import {AddBoardFormComponent} from '../forms/addBoard/addBoard.component'

enum OrderE {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Component({
  selector: 'boards-app',
  templateUrl: './boards.component.html',
  styleUrls: [ './boards.component.css' ]
})
export class BoardsComponent implements OnInit {
  // boards: BoardI[];
  sortOrder: OrderE | null = null;
  showModal: Observable<boolean>;

  boards$: Observable<BoardI[]> = this.store.select((state) => state.boards);

  constructor(private store: Store<any>) {}

  ngOnInit() {
    // this.boards = boards;
    this.store.dispatch(GetBoards())
    // this.boards$.subscribe(console.log)
    this.showModal = this.store.select(showBoardModalSelector);
  }

  onDelete(board:BoardI) {
    // this.boards = this.boards.filter((board) => board.id !== id);

    this.store.dispatch(DeleteBoard({id:board.id}));

    this.boards$.subscribe(console.log)
  }

  saveCurrentBoard(id: string) {
    this.store.dispatch(SetCurrentBoard({ id }));
  }

  setSort(evt: any) {
    if (!evt.value) {
      return;
    }
    this.sortOrder = evt.value;
  }

  openShowModal() {
   
    this.store.dispatch(modalOpen());

  }
}
