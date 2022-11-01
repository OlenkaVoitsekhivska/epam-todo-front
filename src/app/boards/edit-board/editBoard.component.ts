import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateBoard } from '../../store/actions/boards.action';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-editBoard-form',
  templateUrl: './editBoard.component.html',
  // styleUrls: ['./addBoard.component.scss'],
})
export class EditBoardFormComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  editBoardForm!: FormGroup;

  @Input() board!: Board;
  @Output() closeModal = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.editBoardForm = new FormGroup({
      name: new FormControl(this.board.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl(this.board.description),
    });
  }

  get name() {
    return this.editBoardForm.get('name');
  }
  get description() {
    return this.editBoardForm.get('description');
  }

  close() {
    this.closeModal.emit(true);
  }
  onSubmit() {
    this.store.dispatch(
      updateBoard({ id: this.board.id, board: this.editBoardForm.value })
    );
    this.editBoardForm.reset();
    this.close();
  }
}
