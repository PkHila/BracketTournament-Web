import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, forkJoin, map, mergeMap, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Contestant, Template } from 'src/app/core/interfaces';

@Injectable({
  providedIn: 'root' // esta es la clave para destruir un servicio
})
export class ContestantService {

  /* private baseUrl: string = "http://localhost:3000"; */
  /* private templateNamesInDatabase = new BehaviorSubject<string[]>([]); */

  constructor(/* private http: HttpClient */) { }

  public addContestant(contestant: Contestant, selectedContestants: Contestant[]) {

    if (selectedContestants.find(c =>
      c.name == contestant.name &&
      c.author == contestant.author &&
      c.date == contestant.date &&
      c.img == contestant.img
    ) === undefined) {
      selectedContestants.push(contestant);
    }
  }

  public removeContestant(contestant: Contestant, selectedContestants: Contestant[]) {
    selectedContestants.splice(selectedContestants.indexOf(contestant), 1);
  }

  public calculateTournamentWinRate(contestant: Contestant): number {
    if (contestant.tournamentsPlayed != 0 && contestant.tournamentsPlayed && contestant.tournamentsWon) {
      return Math.round(contestant.tournamentsWon * 100 / contestant.tournamentsPlayed);
    }
    else {
      return 0;
    }
  }

  public calculateMatchWinRate(contestant: Contestant): number {
    if (contestant.matchesPlayed && contestant.matchesWon && contestant.matchesPlayed != 0) {
      return Math.round(contestant.matchesWon * 100 / contestant.matchesPlayed);
    }
    else {
      return 0;
    }
  }

  public initializeUndefinedStatistics(contestant: Contestant) {
    if (contestant.matchesPlayed === undefined) {
      contestant.matchesPlayed = 0;
    }
    if (contestant.matchesWon === undefined) {
      contestant.matchesWon = 0;
    }
    if (contestant.tournamentsPlayed === undefined) {
      contestant.tournamentsPlayed = 0;
    }
    if (contestant.tournamentsWon === undefined) {
      contestant.tournamentsWon = 0;
    }
  }

  /* public checkTemplateNameExists(templateName: string): Observable<boolean> {
    const normalizedTemplateName = templateName.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
    return of(this.templateNamesInDatabase.value.includes(normalizedTemplateName));
  } */

  /* public postTemplateLegacy(template: Template): Observable<Template> {
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
  } */

  /* private handleContestantPostings(contestant: Contestant): Observable<Contestant> {
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
  } */

  /* private postContestant(contestant: Contestant): Observable<Contestant> {
    return this.http.post<Contestant>(`${this.baseUrl}/contestants`, contestant);
  } */
}
