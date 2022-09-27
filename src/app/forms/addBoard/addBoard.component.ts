import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import {modalClose} from '../../store/modal.action'
import {Store} from '@ngrx/store';
import {AddBoard} from '../../store/boards.action'

@Component({
  selector: 'app-addBoard-form',
  templateUrl: './addBoard.component.html',
  // styleUrls: ['./addBoard.component.scss'],
})
export class AddBoardFormComponent implements OnInit {
constructor(private store:Store){}
  addBoardForm!: FormGroup;

  ngOnInit(): void {
    this.addBoardForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(AddBoard({board:this.addBoardForm.value}))
    console.log(this.addBoardForm.value);
        this.addBoardForm.reset();
        this.store.dispatch(modalClose())
    // this.state.dispatch(AddBoard(this.addBoardForm.value))
  }
}