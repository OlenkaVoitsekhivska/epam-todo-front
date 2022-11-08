import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addBoard } from '../../store/actions/boards.action';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-board-form',
  templateUrl: './addBoard.component.html',
})
export class AddBoardFormComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  addBoardForm!: FormGroup;
  currentUser!: string | null;
  @Output() closeModal = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.addBoardForm = new FormGroup({
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl<string | null>(null, Validators.required),
    });
    this.currentUser = this.activatedRoute.snapshot.paramMap.get('id');
  }

  get name() {
    return this.addBoardForm.get('name');
  }
  get description() {
    return this.addBoardForm.get('description');
  }

  close() {
    this.closeModal.emit(true);
  }
  onSubmit() {
    if (this.currentUser === null) {
      return;
    }
    this.store.dispatch(
      addBoard({ board: this.addBoardForm.value, userId: this.currentUser })
    );
    this.addBoardForm.reset();
    this.close();
  }
}
