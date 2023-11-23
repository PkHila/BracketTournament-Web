import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, OMDbResponse, OMDbSearchResult, QueryParams } from './types/interfaces';
import { environment } from 'src/environments/environment.development';
import { Contestant } from 'src/app/core/interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OMDbApiService implements ApiService {

  private baseUrl = "https://www.omdbapi.com";

  constructor(private httpClient: HttpClient) { }

  public checkIfImgEmpty(source: string): string {
    if (source !== "N/A") {
      return source;
    }
    else {
      return "/assets/img_not_found.png";
    }
  }

  public getContestants(queryParams: QueryParams): Observable<Contestant[]> {
    
    const searchUrl: string = `${this.baseUrl}/?s=${queryParams.query}&apikey=${environment.omdbApiKey}&type=${queryParams.category}`;

    return this.httpClient.get<OMDbResponse>(searchUrl)
      .pipe<OMDbSearchResult[]>(
        map(response => {
          if (response.Response === "false") {
            throw new Error('No se encontraron resultados');
          }
          return response.Search
        }))
      .pipe<Contestant[]>(
        map(results => {
          const contestants = results.map(result => <Contestant>{
            name: result.Title,
            img: this.checkIfImgEmpty(result.Poster),
            date: result.Year,
            author: ''
          })
          return contestants;
        }))
  }
}
