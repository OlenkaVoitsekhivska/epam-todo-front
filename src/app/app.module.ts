import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BoardsReducer } from './store/boards.reducer';
import { TasksReducer } from './store/tasks.reducer';
import {
  ModalReducer,
  EditBoardReducer,
  AddTaskReducer,
  SignupReducer,
  LoginReducer,
  EditTaskReducer,
} from './store/modal.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './store/boards.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppRoutingModule } from './app-routing.module';
import { SortPipe } from './pipes/sort.pipe';
import { TaskStatusPipe } from './pipes/taskStatus.pipe';
import { FindTasksById } from './pipes/findTasksById.pipe';
import { FindBoardsById } from './pipes/findBoardsById.pipe';
import { ModalComponent } from './modal/modal.component';
import { AddBoardFormComponent } from './forms/addBoard/addBoard.component';
import { EditBoardFormComponent } from './forms/editBoard/editBoard.component';
import { AddTaskFormComponent } from './forms/addTask/addTask.component';
import { TaskEffects } from './store/tasks.effects';
import { TokenInterceptor } from './services/token.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { CurrentUserReducer, UserReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';
import { HeaderComponent } from './header/header.component';
import { FilterBoardsPipe } from './pipes/filter-boards.pipe';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { EditTaskComponent } from './forms/edit-task/edit-task.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    TasksComponent,
    SortPipe,
    TaskStatusPipe,
    FindTasksById,
    FindBoardsById,
    ModalComponent,
    AddBoardFormComponent,
    AddTaskFormComponent,
    EditBoardFormComponent,
    LoginFormComponent,
    SignupFormComponent,
    HeaderComponent,
    FilterBoardsPipe,
    FilterTasksPipe,
    EditTaskComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([BoardEffects, TaskEffects, UserEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    ToastrModule.forRoot(),
    StoreModule.forRoot(
      {
        users: UserReducer,
        loggedUser: CurrentUserReducer,
        boards: BoardsReducer,
        tasks: TasksReducer,
        // currentBoard: CurrentBoardReducer,
        addBoardModal: ModalReducer,
        editBoardModal: EditBoardReducer,
        addTaskModal: AddTaskReducer,
        editTaskModal: EditTaskReducer,
        signupModal: SignupReducer,
        loginModal: LoginReducer,
      },
      {}
    ),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
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
