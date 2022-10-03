import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { modalClose } from "../../store/modal.action";
import { Store } from "@ngrx/store";
import { AddBoard } from "../../store/boards.action";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-addBoard-form",
  templateUrl: "./addBoard.component.html",
  // styleUrls: ['./addBoard.component.scss'],
})
export class AddBoardFormComponent implements OnInit {
  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}
  addBoardForm!: FormGroup;
  currentUser: any;

  ngOnInit(): void {
    this.addBoardForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
    });
    this.currentUser = this.activatedRoute.snapshot.paramMap.get("id");
  }
  close() {
    this.store.dispatch(modalClose());
  }
  onSubmit() {
    this.store.dispatch(
      AddBoard({ board: this.addBoardForm.value, userId: this.currentUser })
    );
    console.log(this.addBoardForm.value);
    this.addBoardForm.reset();
    this.store.dispatch(modalClose());
    // this.state.dispatch(AddBoard(this.addBoardForm.value))
  }
}
