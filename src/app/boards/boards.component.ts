import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board.model';
import { Store } from '@ngrx/store';
import { deleteBoard, getBoards } from '../store/actions/boards.action';

import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { selectAllBoards } from '../store/selectors/boards.selectors';
import { Task } from '../models/task.model';
import {
  faArrowDownShortWide,
  faArrowUpWideShort,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'boards-app',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  organize = {
    sortOrder: '',
    filter: '',
    compositeFilter: '',
  };

  modal = {
    addModal: false,
    editModal: false,
  };

  currentUser: any;
  activeBoard!: Board;
  boards$: Observable<Board[]> = this.store.select(selectAllBoards);

  icons = {
    desc: faArrowDownShortWide,
    asc: faArrowUpWideShort,
    delete: faTrashCan,
    edit: faPenToSquare,
    add: faPlus,
  };

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(getBoards({ id: this.currentUser }));
  }

  onDelete(board: any) {
    this.store.dispatch(deleteBoard({ id: board.id }));
  }

  onEdit(board: any) {
    this.activeBoard = board;
    this.modal.editModal = true;
  }

  setSort(order: string, select: any) {
    this.organize.sortOrder = `${order} ${select}`;
  }
  setFilter(param: string) {
    if (this.organize.filter === '' || param === '') {
      this.organize.compositeFilter = '';
    }
    this.organize.compositeFilter = `${param} ${this.organize.filter}`;
  }

  openShowModal() {
    this.modal.addModal = true;
  }
  onClose() {
    this.modal.addModal = false;
    this.modal.editModal = false;
  }

  taskPerColumn(taskArry: Partial<Task>[], status: string) {
    if (typeof taskArry === 'undefined') {
      return 0;
    }
    return taskArry.filter((task: Partial<Task>) => task.status === status)
      .length;
  }
}
