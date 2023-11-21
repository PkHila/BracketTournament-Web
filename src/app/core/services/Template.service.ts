import { Injectable } from '@angular/core';
import { Template } from '../interfaces';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }
  
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
}
