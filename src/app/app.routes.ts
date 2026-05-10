import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { authGuard } from './core/guards/auth';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { TaskList } from './features/tasks/task-list/task-list';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'tasks',
    component: TaskList,
    canActivate: [authGuard],
  },
];
