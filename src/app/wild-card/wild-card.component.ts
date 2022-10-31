import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-wild-card',
  templateUrl: './wild-card.component.html',
  styleUrls: ['./wild-card.component.scss'],
})
export class WildCardComponent implements OnInit {
  currentUser$: Observable<any> = this.store.select(currentUserSelector);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
