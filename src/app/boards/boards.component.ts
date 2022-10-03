import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BoardI } from '../models/board.model';
import { boards } from './boards';
import { Store } from '@ngrx/store';
import {
  // SetCurrentBoard,
  GetBoards,
  DeleteBoard,
} from '../store/boards.action';
import {
  editBoardModalSelector,
  showBoardModalSelector,
} from '../store/modal.selectors';
import { modalOpen, modalClose, editBoardOpen } from '../store/modal.action';
import { Observable } from 'rxjs';
import { AddBoardFormComponent } from '../forms/addBoard/addBoard.component';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

enum OrderE {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Component({
  selector: 'boards-app',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  sortOrder: string = '';
  filter: string = '';
  compositeFilter: string = '';
  addModal: Observable<boolean> = this.store.select(showBoardModalSelector);
  editModal: Observable<boolean> = this.store.select(editBoardModalSelector);
  currentUser: any;
  boards$: Observable<BoardI[]> = this.store.select((state) => state.boards);
  activeBoard!: BoardI;

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(GetBoards({ id: this.currentUser }));
  }

  onDelete(board: any) {
    this.store.dispatch(DeleteBoard({ id: board.id }));
  }

  onEdit(board: any) {
    console.log(board);
    this.activeBoard = board;
    this.store.dispatch(editBoardOpen());
  }

  setSort(order: string, select: any) {
    this.sortOrder = `${order} ${select}`;
    console.log(this.sortOrder);
  }
  setFilter(param: string) {
    if (this.filter === '' || param === '') {
      return (this.compositeFilter = '');
    }
    return (this.compositeFilter = `${param} ${this.filter}`);
  }

  openShowModal() {
    console.log('open add modal');
    this.store.dispatch(modalOpen());
  }
}
