import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';
import { AddComment } from 'src/app/store/actions/comment.actions';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  @Input() task!: Task;
  addCommentForm!: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.addCommentForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }

  close() {
    this.closeModal.emit(true);
  }

  onSubmit() {
    this.store.dispatch(
      AddComment({
        taskId: this.task.id,
        comment: this.addCommentForm.value,
      })
    );
    this.close();
  }
}