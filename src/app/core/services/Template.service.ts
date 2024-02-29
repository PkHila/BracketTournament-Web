import { Injectable } from '@angular/core';
import { Contestant, Template } from '../interfaces';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categories, LocaleCategories } from '../categories.enum';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates`);
  }

  public getPopularTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates`).pipe(
      map(templates => {
        templates.sort((a, b) => b.timesPlayed! - a.timesPlayed!);
        return templates.slice(0, 3);
      })
    );
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

  public getTemplatesByCategory(category: string): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates?category=${category}`).pipe(
      map(response => {
        if (response.length === 0) {
          throw new Error('No templates created in that category')
        }
        else {
          return response;
        }
      })
    )
  }

  public putTemplate(template: Template, templateId: number): Observable<Template> {
    return this.http.put<Template>(`${this.baseUrl}/templates/${templateId}`, template)
  }

  public calculateMaxRoundCount(contestantCount: number): number {
    let maxRoundCount = 2;
    while (contestantCount > 2 ** maxRoundCount) {
      maxRoundCount++;
    }
    if (contestantCount < 2 ** maxRoundCount) { // disables free pass feature
      maxRoundCount--;
    }
    return maxRoundCount;
  }

  public calculateFreebies(contestantCount: number): number {
    return contestantCount - 2 ** this.calculateMaxRoundCount(contestantCount);
  }

  public isPowerOfTwo(contestantCount: number): boolean{
    return this.calculateFreebies(contestantCount) === 0;
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

  public mapCategoryToLocale(category: Categories): LocaleCategories | undefined {
    switch (category) {
      case Categories.movie:
        return LocaleCategories.movie;
      case Categories.series:
        return LocaleCategories.series;
      case Categories.games:
        return LocaleCategories.games;
      case Categories.anime:
        return LocaleCategories.anime;
      case Categories.manga:
        return LocaleCategories.manga;
      case Categories.albums:
        return LocaleCategories.albums;
      default:
        return undefined;
    }
  }
}
