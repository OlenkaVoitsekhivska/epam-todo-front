import { Component, OnInit} from '@angular/core';
import {TaskI} from '../models/task.model';

import {Store} from '@ngrx/store'
import { SetCurrentBoard } from '../store/boards.action';
// import {selectBoardTasks} from '../store/boards.selectors'
import {Observable} from 'rxjs';
import {modalOpen} from '../store/modal.action'; 
import { showBoardModalSelector } from '../store/modal.selectors';
import {AddTaskFormComponent} from '../forms/addTask/addTask.component'

@Component({
  selector: 'tasks-app',
  templateUrl: './tasks.component.html',
  styleUrls: [ './tasks.component.css' ]
})
export class TasksComponent implements OnInit  {
// tasks$: Observable<TaskI[]>;
tasks$:Observable<any>
showModal: Observable<boolean>;
currentBoard:any;


  ngOnInit(){
// this.tasks$ = this.store.select(selectBoardTasks)
this.showModal = this.store.select(showBoardModalSelector);
  }
  constructor(private store:Store){}

// findTasksById(id:string){
// return tasks.filter(task=>task.boardId===id)
// }

openAddTaskModal(){
  this.store.dispatch(modalOpen())
}
  // onDelete(id:number){
  //   this.boards = this.boards.filter(board=>board.id!==id)
  // }

  // showBoardDetails(id:number){
  //   console.log('clicked twice')
  // }

}