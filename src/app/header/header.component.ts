import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from '../store/user.selectors';
import { Logout } from '../store/user.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}
  currentUser$: Observable<any> = this.store.select(currentUserSelector);

  ngOnInit(): void {}
  logout() {
    this.store.dispatch(Logout());
    console.log('bye');
  }
}
