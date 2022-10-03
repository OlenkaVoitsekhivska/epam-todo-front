import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { editBoardClose } from '../../store/modal.action';
import { Store } from '@ngrx/store';
import { AddBoard, UpdateBoard } from '../../store/boards.action';
import { ActivatedRoute } from '@angular/router';
import { BoardI } from 'src/app/models/board.model';

@Component({
  selector: 'app-editBoard-form',
  templateUrl: './editBoard.component.html',
  // styleUrls: ['./addBoard.component.scss'],
})
export class EditBoardFormComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  editBoardForm!: FormGroup;

  @Input() board!: BoardI;

  ngOnInit(): void {
    this.editBoardForm = new FormGroup({
      name: new FormControl(this.board.name, [Validators.required]),
      description: new FormControl(this.board.description, Validators.required),
    });

    console.log(this.board);
  }
  close() {
    this.store.dispatch(editBoardClose());
  }
  onSubmit() {
    const data = {
      name: this.editBoardForm.value.name,
      description: this.editBoardForm.value.description,
    };
    this.store.dispatch(
      UpdateBoard({ id: this.board.id, board: this.editBoardForm.value })
    );
    this.store.dispatch(editBoardClose());
  }
}
