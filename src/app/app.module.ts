import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BoardsReducer } from './store/reducers/boards.reducer';
import { TasksReducer } from './store/reducers/tasks.reducer';

import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './store/effects/boards.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardsComponent } from './boards/boards.component';
import { AddBoardFormComponent } from './boards/add-board/addBoard.component';
import { EditBoardFormComponent } from './boards/edit-board/editBoard.component';
import { FilterBoardsPipe } from './pipes/filter-boards.pipe';

import { TasksComponent } from './tasks/tasks.component';
import { TaskStatusPipe } from './pipes/taskStatus.pipe';
import { AddTaskFormComponent } from './tasks/add-task/addTask.component';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SortPipe } from './pipes/sort.pipe';

import { ModalComponent } from './modal/modal.component';

import { TaskEffects } from './store/effects/tasks.effects';
import { TokenInterceptor } from './services/token.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';
import { CurrentUserReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { HeaderComponent } from './header/header.component';

import { environment } from '../environments/environment';
import { ColorpickerDirective } from './directives/colorpicker/colorpicker.directive';

import { AddCommentComponent } from './tasks/add-comment/add-comment.component';
import { CommentsEffects } from './store/effects/comments.effects';

import { SingleBoardEffects } from './store/effects/board.effects';
import { BoardReducer } from './store/reducers/board.reducer';
import { WildCardComponent } from './wild-card/wild-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    AddBoardFormComponent,
    EditBoardFormComponent,
    SortPipe,
    TasksComponent,
    TaskStatusPipe,
    AddTaskFormComponent,
    FilterTasksPipe,
    EditTaskComponent,
    ModalComponent,

    LoginFormComponent,
    SignupFormComponent,
    HeaderComponent,
    FilterBoardsPipe,

    ColorpickerDirective,

    AddCommentComponent,
    WildCardComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragDropModule,

    ToastrModule.forRoot({
      timeOut: 1000,
    }),

    StoreModule.forRoot(
      {
        loggedUser: CurrentUserReducer,
        board: BoardReducer,
        boards: BoardsReducer,
        tasks: TasksReducer,
      },
      {}
    ),
    EffectsModule.forRoot([
      SingleBoardEffects,
      BoardEffects,
      TaskEffects,
      UserEffects,
      CommentsEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
