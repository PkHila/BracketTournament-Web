import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ContestantService } from "../core/services/Contestant.service";
import { Observable, catchError, debounceTime, map, of, switchMap } from "rxjs";

export class CustomValidators {

    static templateNameExists(contestantService: ContestantService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const value = control.value;
            if(!value) {
                return of(null);
            }
            return of(control.value).pipe(
                debounceTime(300), // Espera 300ms después de que el usuario deja de escribir
                switchMap(name => contestantService.checkTemplateNameExists(name)),
                map(res => (res ? { templateNameExists: true } : null)),
                catchError(() => of(null)) // Maneja errores, por ejemplo, si hay un problema con la conexión al servidor
            )
        }
    }
}