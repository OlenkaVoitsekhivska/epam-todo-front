import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { RedirGuard } from './services/redir.guard';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/boards',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupFormComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'users/:id/boards',
    component: BoardsComponent,
  },
  {
    path: 'boards/:id/tasks',
    component: TasksComponent,
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
