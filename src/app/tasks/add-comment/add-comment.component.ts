import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addComment } from 'src/app/store/actions/comment.actions';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  @Input() task!: Task;
  addCommentForm!: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.addCommentForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }
  get name() {
    return this.addCommentForm.get('name');
  }

  close() {
    this.closeModal.emit(true);
  }

  onSubmit() {
    this.store.dispatch(
      addComment({
        taskId: this.task.id,
        comment: this.addCommentForm.value,
      })
    );
    this.close();
  }
}
