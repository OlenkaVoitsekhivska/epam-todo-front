import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatusE, Task } from '../models/task.model';

import { Store } from '@ngrx/store';

import {
  GetTasks,
  deleteTask,
  updateTask,
} from '../store/actions/tasks.action';

import { Observable, map, skipWhile } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { selectAllTasks } from '../store/selectors/tasks.selectors';

import {
  faArrowDownShortWide,
  faArrowUpWideShort,
  faBrush,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { deleteComment } from '../store/actions/comment.actions';
import { updateColor } from '../store/actions/board.action';
import { Board } from '../models/board.model';
import { selectBoard, selectUI } from '../store/selectors/boards.selectors';
import { getBoardById } from '../store/actions/board.action';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  uiPreferences$: Observable<any> = this.store.select(selectUI).pipe(
    skipWhile((res) => !res),
    map(({ col1, col2, col3 }) => ({ col1, col2, col3 }))
  );

  tasks$: Observable<Task[]> = this.store.select(selectAllTasks);
  board$: Observable<Partial<Board>> = this.store.select(selectBoard);
  addModal: boolean = false;
  editModal: boolean = false;
  addCommentModal: boolean = false;

  showComments = {
    taskId: '',
    show: false,
  };

  currentBoard!: any;

  statusOutput!: string;
  sortOrder: string = '';
  filter: string = '';
  compositeFilter: string = '';
  activeTask!: Task;

  status = {
    todo: StatusE.TODO,
    in_progress: StatusE.IN_PROGRESS,
    done: StatusE.DONE,
  };

  showColorpicker = {
    col1: false,
    col2: false,
    col3: false,
  };

  icons = {
    desc: faArrowDownShortWide,
    asc: faArrowUpWideShort,
    delete: faTrashCan,
    edit: faPenToSquare,
    add: faPlus,
    paint: faBrush,
  };

  ngOnInit() {
    this.currentBoard = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(getBoardById({ id: this.currentBoard }));
    this.store.dispatch(GetTasks({ id: this.currentBoard }));
  }
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  openAddTaskModal(value: StatusE) {
    this.statusOutput = value;
    this.addModal = true;
  }
  deleteTask(id: string) {
    this.store.dispatch(deleteTask({ id }));
  }

  setSort(order: string, select: string) {
    this.sortOrder = `${order} ${select}`;
  }
  setFilter(param: string) {
    if (this.filter === '' || param === '') {
      this.compositeFilter = '';
    }
    this.compositeFilter = `${param} ${this.filter}`;
  }

  onEdit(task: Task) {
    this.activeTask = task;
    this.editModal = true;
  }
  addComment(todo: Task) {
    this.activeTask = todo;
    this.addCommentModal = true;
  }

  toggleShowComments(todo: Task) {
    this.showComments.taskId = todo.id;
    this.showComments.show = !this.showComments.show;
  }
  conditionShowComments(todo: Task): Comment[] | undefined {
    if (todo.userComments.length && todo.id === this.showComments.taskId) {
      return todo.userComments;
    } else {
      return;
    }
  }

  deleteComment(commentId: string) {
    this.store.dispatch(deleteComment({ id: commentId }));
  }

  onClose() {
    this.addModal = false;
    this.editModal = false;
    this.addCommentModal = false;
  }

  checkIsImg(string: string): boolean {
    return string.length > 0;
  }

  handleColorSwitch(boardId: string, column: string, event: any) {
    const data = { [column]: event.target.value };
    this.store.dispatch(updateColor({ id: boardId, color: data }));
  }

  toggleColorpicker(column: string) {
    (this.showColorpicker as any)[column] = !(this.showColorpicker as any)[
      column
    ];
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const { id, name, boardId, image, createdAt, userComments } =
        event.item.data;

      this.store.dispatch(
        updateTask({
          task: {
            id,
            name,
            boardId,
            image,
            createdAt,
            userComments,
            status: event.container.id as StatusE,
          },
        })
      );
    }
  }
}
