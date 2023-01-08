import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { of } from 'rxjs';
import { HeaderComponent } from './header.component';

import { mockLoggedUser } from 'src/mockData/user/mockLoggedUser';
import { loggedUser } from '../models/loggedUser.model';
import { logout } from '../store/actions/user.action';
import { clearState as clearTaskState } from '../store/actions/tasks.action';
import { clearState as clearBoardState } from '../store/actions/board.action';

describe('Tasks component', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: HeaderComponent;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        provideMockStore({}),
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.inject(MockStore);
    componentInstance = fixture.componentInstance;

    debugElement = fixture.debugElement;
    componentInstance.currentUser$ = of(mockLoggedUser);
    fixture.detectChanges();
  });

  it('should access currentuser data', () => {
    componentInstance.currentUser$.subscribe((res: loggedUser) => {
      expect(res).toEqual(mockLoggedUser);
    });
  });

  it('should display user email', () => {
    let user;
    componentInstance.currentUser$.subscribe((res: loggedUser) => {
      user = res;
    });
    const userEmail = debugElement.nativeElement.querySelector(
      '[data-testid="user-email"]'
    );
    expect(userEmail.innerText).toBe(mockLoggedUser.email);
  });

  it('should dispatch logout action on logout', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    componentInstance.logout();
    expect(dispatchSpy).toHaveBeenCalledWith(logout());
  });

  it('should dispatch clearBoardState on clearState', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    componentInstance.clearState();
    expect(dispatchSpy).toHaveBeenCalledWith(clearBoardState());
  });

  it('should dispatch clearBoardState on clearState', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    componentInstance.clearState();
    expect(dispatchSpy).toHaveBeenCalledWith(clearTaskState());
  });
});
