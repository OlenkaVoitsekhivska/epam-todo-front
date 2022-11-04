import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildCardComponent } from './wild-card.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('WildCardComponent', () => {
  let component: WildCardComponent;
  let fixture: ComponentFixture<WildCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WildCardComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(WildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
