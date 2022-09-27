import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {modalClose} from '../store/modal.action'

// import {ModalService} from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  // display$: Observable<'open' | 'close'>;

  constructor(
      private store:Store
  ) {}

  // ngOnInit() {
  //   this.display$ = this.modalService.watch();
  // }
  
  ngOnInit() {
  console.log('hi bitch')
  }

  close(){
    this. store.dispatch(modalClose())
  }

  // close() {
  //   this.modalService.close();
  // }
}