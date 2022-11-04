import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUser } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'epam-angular-proj-front';

  ngOnInit() {
    this.store.dispatch(getCurrentUser());
  }

  constructor(private store: Store) {}
}
