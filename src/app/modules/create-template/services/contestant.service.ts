import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Contestant, Template } from 'src/app/core/interfaces';

@Injectable({
  providedIn: 'root' // esta es la clave para destruir un servicio
})
export class ContestantService {

  private baseUrl: string = "http://localhost:3000";
  private contestantsInDatabase = new BehaviorSubject<Contestant[]>([]);
  private templateNamesInDatabase = new BehaviorSubject<string[]>([]);

  constructor(private httpClient: HttpClient) {
    this.fetchContestants();
    this.fetchTemplateNames();
  }

  private fetchContestants(): void {
    this.httpClient.get<Contestant[]>(`${this.baseUrl}/contestants`).subscribe({
      next: contestants => {
        this.contestantsInDatabase.next(contestants);
      },
      error: () => {
        console.log('error');
      }
    })
  }

  private fetchTemplateNames(): void {
    this.httpClient.get<Template[]>(`${this.baseUrl}/templates`)
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

  /* public postTemplate(template: Template): Observable<boolean>  {
    
  } */

  private postContestant(contestant: Contestant): Observable<Contestant> {
    return this.httpClient.post<Contestant>(`${this.baseUrl}/contestants`, contestant);
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
