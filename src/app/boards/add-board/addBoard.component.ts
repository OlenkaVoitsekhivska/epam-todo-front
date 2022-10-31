import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddBoard } from '../../store/actions/boards.action';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-addBoard-form',
  templateUrl: './addBoard.component.html',
  // styleUrls: ['./addBoard.component.scss'],
})
export class AddBoardFormComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  addBoardForm!: FormGroup;
  currentUser: any;
  @Output() closeModal = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.addBoardForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
    });
    this.currentUser = this.activatedRoute.snapshot.paramMap.get('id');
  }
  close() {
    this.closeModal.emit(true);
  }
  onSubmit() {
    this.store.dispatch(
      AddBoard({ board: this.addBoardForm.value, userId: this.currentUser })
    );
    this.addBoardForm.reset();
    this.close();
  }
}