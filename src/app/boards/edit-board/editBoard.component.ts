import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateBoard } from '../../store/actions/boards.action';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-edit-board-form',
  templateUrl: './editBoard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBoardFormComponent implements OnInit {
  constructor(private store: Store) {}
  editBoardForm!: FormGroup;

  @Input() board!: Board;
  @Output() closeModal = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.editBoardForm = new FormGroup({
      name: new FormControl(this.board.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl(this.board.description, [
        Validators.required,
        Validators.minLength(1),
      ]),
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
      updateBoard({
        id: this.board.id,
        board: { ...this.board, ...this.editBoardForm.value },
      })
    );
    this.editBoardForm.reset();
    this.close();
  }
}
