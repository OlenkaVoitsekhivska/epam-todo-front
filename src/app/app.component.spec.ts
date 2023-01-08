import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DebugElement } from '@angular/core';
import { getCurrentUser } from './store/actions/user.action';
import { SpinnerService } from './services/spinner.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let store: MockStore;
  let componentInstance: AppComponent;
  let spinner: SpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    spinner = TestBed.inject(SpinnerService);
    componentInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'epam-angular-proj-front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('epam-angular-proj-front');
  });

  it('should dispatch getCurrentUser on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    componentInstance.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(getCurrentUser());
  });
});
