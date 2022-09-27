import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CurrentBoardReducer, BoardsReducer } from './store/boards.reducer';
import {TasksReducer} from './store/tasks.reducer';
import { ModalReducer } from './store/modal.reducer';
import { EffectsModule } from '@ngrx/effects';
import {BoardEffects} from './store/boards.effects' 


import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppRoutingModule } from './app-routing.module';
import { SortPipe } from './pipes/sort.pipe';
import { TaskStatusPipe } from './pipes/taskStatus.pipe';
import { ModalComponent } from './modal/modal.component';
import {AddBoardFormComponent} from './forms/addBoard/addBoard.component';

import {AddTaskFormComponent} from './forms/addTask/addTask.component'

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([BoardEffects]),
    StoreModule.forRoot({
      boards:BoardsReducer,
      tasks:TasksReducer,
      currentBoard: CurrentBoardReducer,
      showBoardModal: ModalReducer,
    }),
  ],
  declarations: [
    AppComponent,
    BoardsComponent,
    TasksComponent,
    SortPipe,
    TaskStatusPipe,
    ModalComponent,
    AddBoardFormComponent,
    AddTaskFormComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
