import { CanActivateFn } from '@angular/router';
import { isCategory } from '../categories.enum';

export const templateGuard: CanActivateFn = (route, state) => {
  const categoryParam = route.paramMap.get('category');

  if (!categoryParam || !isCategory(categoryParam)) {
    return false;
  }
  return true;
};
