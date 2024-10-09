import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
/* import { ContestantService } from "../core/services/Contestant.service"; */
import { Observable, catchError/* , debounceTime */, delay, map, of, switchMap } from "rxjs";
import { TemplateService } from "../core/services/Template.service";

export class CustomValidators {

    static templateNameExists(service: TemplateService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const value = control.value;
            if (!value) {
                return of(null);
            }
            return of(control.value).pipe(
                delay(1000),
                switchMap(name => service.checkTemplateNameExists(name)),
                map(res => (res ? { templateNameExists: true } : null)),
                catchError(() => of(null))
            );
        }
    }
}