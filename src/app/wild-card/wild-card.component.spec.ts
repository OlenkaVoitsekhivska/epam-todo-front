import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildCardComponent } from './wild-card.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { mockLoggedUser } from 'src/mockData/user/mockLoggedUser';
import { EMPTY, of } from 'rxjs';

describe('WildCardComponent', () => {
  let component: WildCardComponent;
  let fixture: ComponentFixture<WildCardComponent>;
  let debugElement: DebugElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WildCardComponent],
      providers: [provideMockStore({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WildCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display h2 tag with "Page not found text" if user is unauthorized', () => {
    const notFoundTag = debugElement.query(By.css('h2'));
    expect(notFoundTag).toBeTruthy();
  });

  it('should handle scenario where user input has been passed', () => {
    component.currentUser$ = of(mockLoggedUser);
    component.currentUser$.subscribe((res) => {
      expect(res).toEqual(mockLoggedUser);
    });
  });

  it('should handle scenario where user input has not been passed', () => {
    component.currentUser$ = of({});
    component.currentUser$.subscribe((res) => {
      expect(res).not.toEqual(mockLoggedUser);
    });
  });
});
