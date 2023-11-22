import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const tournamentGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const totalRoundsParam = route.paramMap.get('totalRounds');
  const templateName = route.paramMap.get('templateName')
  if (totalRoundsParam !== null) {
    const totalRounds = parseInt(totalRoundsParam);
    if (Number.isInteger(totalRounds) && totalRounds >= 2 && totalRounds < 7) {
      return true;
    }
  }
  return router.parseUrl(`${templateName}`);
};
