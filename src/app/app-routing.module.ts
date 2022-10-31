import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirGuard } from './services/redir.guard';
import { WildCardComponent } from './wild-card/wild-card.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { BoardsComponent } from './boards/boards.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
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
    component: WildCardComponent,
    canActivate: [RedirGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RedirGuard],
})
export class AppRoutingModule {}
