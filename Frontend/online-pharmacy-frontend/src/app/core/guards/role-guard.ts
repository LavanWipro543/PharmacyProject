import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn =
(route) => {

  const expectedRole =
    route.data['role'];

  const role =
    localStorage.getItem('role');

  return role === expectedRole;
};