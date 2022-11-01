import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddTask } from 'src/app/store/actions/tasks.action';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-addTask-form',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.scss'],
})
export class AddTaskFormComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  @Input() status = '';
  @Output() closeModal = new EventEmitter<boolean>();
  file: any = null;

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const boardId: any = this.activatedRoute.snapshot.paramMap.get('id');
    const formWithImg = new FormData();
    if (this.file) {
      formWithImg.set('image', this.file);
    }
    formWithImg.set('name', form.value.name);
    formWithImg.set('status', this.status);
    formWithImg.set('boardId', boardId);

    this.store.dispatch(AddTask({ task: formWithImg, boardId }));
    this.close();
  }

  uploadImage(event: Event) {
    this.file = (event.target as HTMLInputElement).files!['0'];
  }

  close() {
    this.closeModal.emit(true);
  }
}
