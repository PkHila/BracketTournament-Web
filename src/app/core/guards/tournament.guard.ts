import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { TemplateService } from '../services/Template.service';
import { catchError, map, of } from 'rxjs';

export const tournamentGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const templateService = inject(TemplateService);
  const totalRoundsParam = route.paramMap.get('totalRounds');
  const templateName = route.paramMap.get('templateName');
  return templateService.getTemplateByName(templateName ?? "")
    .pipe(
      map(t => {
        if (!totalRoundsParam) {
          return true;
        } else {
          const totalRounds = parseInt(totalRoundsParam);
          const maxRoundCount = templateService.calculateMaxRoundCount(t.contestants?.length ?? 0);
          if (Number.isInteger(totalRounds) && totalRounds >= 2 && totalRounds <= maxRoundCount) {
            return true;
          }
          return router.parseUrl(`404`);
        }
      }),
      catchError(() => of(router.parseUrl(`404`)))
    );
}
