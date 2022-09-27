import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {modalClose} from '../../store/modal.action'
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-addTask-form',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.css'],
})
export class AddTaskFormComponent implements OnInit {
constructor(private store:Store){}
  ngOnInit(): void {}

  onSubmit(form:NgForm) {
    const data = {
      name: form.value.name,
      status: form.value.status,
      image: form.value.image,
    };
    console.log(data);
     
        this.store.dispatch(modalClose())
    // this.state.dispatch(AddBoard(this.addBoardForm.value))
  }
}