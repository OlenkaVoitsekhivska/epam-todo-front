import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SpinnerService } from './services/spinner.service';
import { getCurrentUser } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'epam-angular-proj-front';
  spinner$ = this.spinner.loading$;

  ngOnInit() {
    this.store.dispatch(getCurrentUser());
  }

  constructor(private store: Store, private spinner: SpinnerService) {}
}
