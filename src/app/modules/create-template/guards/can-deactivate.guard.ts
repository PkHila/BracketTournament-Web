import { CanDeactivateFn } from '@angular/router';
import { CreateTemplatePageComponent } from '../create-template-page/create-template-page.component';

export const canDeactivateGuard: CanDeactivateFn<CreateTemplatePageComponent> = (component, currentRoute, currentState, nextState) => {

  if (component.selectedContestants.length === 0) {
    return true;
  }
  return component.showConfirmationDialog();
};
