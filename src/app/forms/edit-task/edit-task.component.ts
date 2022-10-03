import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskI } from 'src/app/models/task.model';
import { editTaskClose } from 'src/app/store/modal.action';
import { UpdateTask } from 'src/app/store/tasks.action';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  editTaskForm!: FormGroup;

  @Input() task!: TaskI;

  ngOnInit(): void {
    this.editTaskForm = new FormGroup({
      name: new FormControl(this.task.name, [Validators.required]),
    });
  }
  close() {
    this.store.dispatch(editTaskClose());
  }
  onSubmit() {
    this.store.dispatch(
      UpdateTask({ id: this.task.id, task: this.editTaskForm.value })
    );
    this.store.dispatch(editTaskClose());
  }
}
