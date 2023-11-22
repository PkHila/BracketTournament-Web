import { CanActivateFn, Router } from '@angular/router';
import { isCategory } from '../categories.enum';
import { inject } from '@angular/core';

export const templateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const categoryParam = route.paramMap.get('category');
  if (!categoryParam || !isCategory(categoryParam)) {
    return router.parseUrl('create-template');
  }
  return true;
};
