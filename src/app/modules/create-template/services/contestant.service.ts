import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, forkJoin, map, mergeMap, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Contestant, Template } from 'src/app/core/interfaces';

@Injectable({
  providedIn: 'root' // esta es la clave para destruir un servicio
})
export class ContestantService {

  private baseUrl: string = "http://localhost:3000";
  private templateNamesInDatabase = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    this.fetchTemplateNames(); // need to change
  }

  private fetchTemplateNames(): void {
    this.http.get<Template[]>(`${this.baseUrl}/templates`)
      .pipe<string[]>(
        map(templates => {
          const templatesNames = templates.map(template =>
            template.templateName.toLocaleLowerCase())
          return templatesNames;
        })
      ).subscribe({
        next: templateNames => {
          this.templateNamesInDatabase.next(templateNames);
        },
        error: () => {
          console.log('error');
        }
      })
  }

  public checkTemplateNameExists(templateName: string): Observable<boolean> {
    return of(this.templateNamesInDatabase.value.includes(templateName.toLocaleLowerCase()));
  }

  public postTemplateLegacy(template: Template): Observable<Template> {
    template.contestantIds = [];

    const contestantObservables = template.contestants!.map(contestant =>
      this.handleContestantPostings(contestant)
    );

    return forkJoin(contestantObservables).pipe(
      mergeMap((validatedContestants) => {
        validatedContestants.forEach(contestant => {
          template.contestantIds!.push(contestant.id!);
        });
        template.contestants = undefined; // drop unnecesary bloat
        return of(null).pipe(delay(3000)).pipe(
          mergeMap(() => {
            return this.http.post<Template>(`${this.baseUrl}/templates`, template)
          }))
      })
    );
  }

  private handleContestantPostings(contestant: Contestant): Observable<Contestant> {
    if (contestant.img === undefined) { contestant.img = ''; }
    if (contestant.date === undefined) { contestant.date = ''; }
    if (contestant.author === undefined) { contestant.author = ''; }

    return this.http.get<Contestant[]>(
      `${this.baseUrl}/contestants?name=${contestant.name}&img=${contestant.img}&date=${contestant.date}&author=${contestant.author}`
    ).pipe(
      mergeMap(dbContestant => {
        contestant.id = dbContestant[0]?.id;
        if (contestant.id === undefined) {
          return of(null).pipe(delay(1000)).pipe(
            mergeMap(() => {
              return this.postContestant(contestant);
            })
          )
        } else {
          return of(contestant);
        }
      })
    );
  }

  public postTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(`${this.baseUrl}/templates`, template);
  }

  private postContestant(contestant: Contestant): Observable<Contestant> {
    return this.http.post<Contestant>(`${this.baseUrl}/contestants`, contestant);
  }

  public addContestant(contestant: Contestant, selectedContestants: Contestant[]) {
    if (!selectedContestants.includes(contestant)) {
      selectedContestants.push(contestant);
    }
  }

  public removeContestant(contestant: Contestant, selectedContestants: Contestant[]) {
    selectedContestants.splice(selectedContestants.indexOf(contestant), 1);
  }
}
