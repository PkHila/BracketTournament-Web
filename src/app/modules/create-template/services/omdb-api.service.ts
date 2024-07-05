import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, OMDbResponse, OMDbSearchResult, QueryParams } from './types/interfaces';
import { environment } from 'src/environments/environment.development';
import { Contestant } from 'src/app/core/interfaces';
import { concatMap, map, Observable, of } from 'rxjs';

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

    return this.searchForContestants(searchUrl);
  }

  private searchForContestants(searchUrl: string): Observable<Contestant[]> {
    return this.httpClient.get<OMDbResponse>(searchUrl)
      .pipe<OMDbSearchResult[]>(
        concatMap(response => {
          if (response.Response === "false") {
            throw new Error('No se encontraron resultados');
          }
          const totalResults = Number.parseInt(response.totalResults);
          if (totalResults > 10) {
            return this.httpClient.get<OMDbResponse>(`${searchUrl}&page=2`)
              .pipe<OMDbSearchResult[]>(
                map(nextPageResponse =>
                  response.Search.concat(nextPageResponse.Search)));
          } else {
            return of(response.Search)
          }
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


