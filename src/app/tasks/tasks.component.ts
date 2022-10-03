import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskI } from '../models/task.model';

import { Store } from '@ngrx/store';
// import { SetCurrentBoard } from '../store/boards.action';
import { DeleteTask, GetTasks } from '../store/tasks.action';
// import {selectBoardTasks} from '../store/boards.selectors'
import { Observable } from 'rxjs';
import { addTaskOpen, editTaskOpen, modalOpen } from '../store/modal.action';
import {
  addTaskModalSelector,
  editTaskSelector,
  showBoardModalSelector,
} from '../store/modal.selectors';
import { AddTaskFormComponent } from '../forms/addTask/addTask.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tasks-app',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks$: Observable<TaskI[]> = this.store.select((state: any) => state.tasks);
  addTaskModal: Observable<boolean> = this.store.select(addTaskModalSelector);
  currentBoard: any;
  statusOutput!: string;
  sortOrder: string = '';
  filter: string = '';
  compositeFilter: string = '';
  // activeTask: string;
  activeTask!: TaskI;
  editModal: Observable<boolean> = this.store.select(editTaskSelector);

  ngOnInit() {
    this.currentBoard = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(GetTasks({ id: this.currentBoard }));
  }
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  openAddTaskModal(value: string) {
    this.statusOutput = value;
    this.store.dispatch(addTaskOpen());
  }
  deleteTask(id: string) {
    this.store.dispatch(DeleteTask({ id }));
    console.log(id);
  }

  setSort(order: string, select: string) {
    return (this.sortOrder = `${order} ${select}`);
  }
  setFilter(param: string) {
    if (this.filter === '' || param === '') {
      return (this.compositeFilter = '');
    }
    return (this.compositeFilter = `${param} ${this.filter}`);
  }

  onEdit(task: any) {
    this.activeTask = task;
    this.store.dispatch(editTaskOpen());
  }
  // showBoardDetails(id:number){
  //   console.log('clicked twice')
  // }
}
