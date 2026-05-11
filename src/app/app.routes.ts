import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { authGuard } from './core/guards/auth';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { TaskList } from './features/tasks/task-list/task-list';
import { UserList } from './features/users/user-list/user-list';
import { roleGuard } from './core/guards/role';
import { NotFound } from './shared/pages/not-found/not-found';
import { Home } from './features/landing/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },

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

  {
    path: 'users',
    component: UserList,
    canActivate: [authGuard, roleGuard],
  },

  {
    path: '**',
    component: NotFound,
  },
];
