import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from '../store/selectors/user.selectors';
import { logout } from '../store/actions/user.action';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}
  currentUser$: Observable<any> = this.store.select(currentUserSelector);
  userIcon = faUser;

  ngOnInit(): void {}
  logout() {
    this.store.dispatch(logout());
  }
}
