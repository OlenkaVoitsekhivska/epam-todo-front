import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { addTaskClose, modalClose } from '../../store/modal.action';
import { Store } from '@ngrx/store';
import { AddTask } from 'src/app/store/tasks.action';
import { AddTaskI } from '../../models/addTask.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addTask-form',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.scss'],
})
export class AddTaskFormComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  @Input() status = '';
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const boardId: any = this.activatedRoute.snapshot.paramMap.get('id');
    const data: AddTaskI = {
      name: form.value.name,
      status: this.status,
      image: form.value.image,
      boardId,
    };
    console.log(data);

    this.store.dispatch(AddTask({ task: data, boardId }));
    this.store.dispatch(addTaskClose());
  }

  close() {
    this.store.dispatch(addTaskClose());
  }
}
