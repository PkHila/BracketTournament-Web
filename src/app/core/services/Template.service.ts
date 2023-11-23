import { Injectable } from '@angular/core';
import { Contestant, Template } from '../interfaces';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates`);
  }

  public postTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(`${this.baseUrl}/templates`, template);
  }

  public getTemplateByName(templateName: string): Observable<Template> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates?templateName=${templateName}`).pipe(
      map(response => {
        if (response.length === 1) {
          return response[0];
        }
        else {
          throw new Error('No template with such name');
        }
      })
    );
  }

  public putTemplate(template: Template, templateId: number): Observable<Template> {
    return this.http.put<Template>(`${this.baseUrl}/templates/${templateId}`, template)
  }

  public calculateMaxRoundCount(template: Template): number {
    let maxRoundCount = 2;
    const contestantCount = template.contestants!.length;
    while (contestantCount > 2 ** maxRoundCount) {
      maxRoundCount++;
    }
    if (contestantCount > maxRoundCount ** 2) {
      maxRoundCount--;
    }
    return maxRoundCount;
  }

  public searchForCoverImg(template: Template): string {
    let mostWins = 0;
    let contestantWithMostTournamentsWon: Contestant;
    template.contestants!.forEach(contestant => {
      if (contestant.tournamentsWon && mostWins < contestant.tournamentsWon) {
        mostWins = contestant.tournamentsWon;
        contestantWithMostTournamentsWon = contestant;
      }
    })
    if (mostWins === 0) {
      return template.contestants!.at(0)!.img!;
    }
    return contestantWithMostTournamentsWon!.img!;
  }

  public getRandomTemplateName(): Observable<string> {
    return this.getTemplates().pipe(
      map(templates => {
        const randomIndex = Math.floor(Math.random() * templates.length);
        return templates.at(randomIndex)!.templateName;
      })
    )
  }
}
