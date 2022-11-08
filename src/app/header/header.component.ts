import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from '../store/selectors/user.selectors';
import { loggedUser } from '../models/loggedUser.model';
import { logout } from '../store/actions/user.action';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { clearState as clearBoardState } from '../store/actions/board.action';
import { clearState as clearTaskState } from '../store/actions/tasks.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private store: Store) {}
  currentUser$: Observable<loggedUser> = this.store.select(currentUserSelector);
  userIcon = faUser;

  logout() {
    this.store.dispatch(logout());
  }

  clearState() {
    this.store.dispatch(clearBoardState());
    this.store.dispatch(clearTaskState());
  }
}
