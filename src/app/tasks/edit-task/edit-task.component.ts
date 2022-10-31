import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';

import { UpdateTask } from 'src/app/store/actions/tasks.action';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  editTaskForm!: FormGroup;

  @Input() task!: Task;
  @Output() closeModal = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.editTaskForm = new FormGroup({
      name: new FormControl(this.task.name, [Validators.required]),
    });
  }
  close() {
    this.closeModal.emit(true);
  }
  onSubmit() {
    const data = {
      ...this.task,
      ...this.editTaskForm.value,
    };
    this.store.dispatch(UpdateTask({ task: data }));
    this.closeModal.emit(true);
    this.close();
  }
}
