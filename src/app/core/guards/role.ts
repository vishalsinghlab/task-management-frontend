import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const router = inject(Router);

  const user = authService.getUser();

  if (user?.role !== 'MANAGER') {
    router.navigate(['/dashboard']);

    return false;
  }

  return true;
};
