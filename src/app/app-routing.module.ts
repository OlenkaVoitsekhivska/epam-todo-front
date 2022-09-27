import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { TasksComponent } from './tasks/tasks.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: '/boards',
    pathMatch: 'full',
  },
  {
    path: 'boards',
    component: BoardsComponent,

  },
  {
    path: 'boards/:id/tasks',
    component: TasksComponent
  },
  {
    path: '**',
    component: BoardsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [RedirGuard],
})
export class AppRoutingModule {}