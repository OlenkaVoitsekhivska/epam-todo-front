import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Board } from '../models/board.model';
import { StatusE } from '../models/task.model';
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
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  status = {
    todo: StatusE.TODO,
    in_progress: StatusE.IN_PROGRESS,
    done: StatusE.DONE,
  };

  currentUser!: string | null;
  activeBoard!: Board;
  boards$: Observable<Board[]> = this.store.select(selectAllBoards);

  icons = {
    desc: faArrowDownShortWide,
    asc: faArrowUpWideShort,
    delete: faTrashCan,
    edit: faPenToSquare,
    add: faPlus,
  };

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.currentUser = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.currentUser === null) {
      return;
    }
    this.store.dispatch(getBoards({ id: this.currentUser }));
  }

  onDelete(board: Board) {
    this.store.dispatch(deleteBoard({ id: board.id }));
  }

  onEdit(board: Board) {
    this.activeBoard = board;
    this.modal.editModal = true;
  }

  setSort(order: string, select: string) {
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

  taskPerColumn(taskArry: Partial<Task>[], status: StatusE): number {
    if (typeof taskArry === 'undefined') {
      return 0;
    }
    return taskArry.filter((task: Partial<Task>) => task.status === status)
      .length;
  }
}
