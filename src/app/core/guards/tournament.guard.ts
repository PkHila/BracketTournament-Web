import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const tournamentGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const totalRoundsParam = route.paramMap.get('totalRounds');
  if (totalRoundsParam !== null) {
    const totalRounds = parseInt(totalRoundsParam);
    if (Number.isInteger(totalRounds) && totalRounds >= 2 && totalRounds < 7) {
      return true;
    }
  }
  return router.parseUrl('create-template'); // placeholder route
  // TODO: idealmente si se llega a este momento es porque el torneo existe y tiene una vista relacionada
  //       se puede redirigir a la vista de ese torneo para elegir una cantidad de rondas valida
};
