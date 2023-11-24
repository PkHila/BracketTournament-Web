import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Contestant } from 'src/app/core/interfaces';
import { environment } from 'src/environments/environment.development';
import { ApiService, QueryParams, RawgIoResponse, RawgIoResult } from './types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RawgIoApiService implements ApiService {

  private baseUrl = "https://api.rawg.io/api/games";

  constructor(private http: HttpClient) { }
  
  checkIfImgEmpty(source: string): string {
    if (source) {
      return source;
    }
    else {
      return "/assets/img_not_found.png";
    }
  }

  public getContestants(queryParams: QueryParams): Observable<Contestant[]> {

    const searchUrl = `${this.baseUrl}?key=${environment.rawgApiKey}&search=${queryParams.query}`;
    
    return this.http.get<RawgIoResponse>(searchUrl)
      .pipe<RawgIoResult[]>(
        map(response => {
          if (response.count === 0) {
            throw new Error('No se encontraron resultados');
          }
          return response.results;
        })
      )
      .pipe<Contestant[]>(
        map(results => {
          const contestants = results.map<Contestant>(result => {
            const contestant: Contestant = {
              name: result.name,
              img: this.checkIfImgEmpty(result.background_image),
              author: ''
            }
            if (result.tba === true) {
              contestant.date = 'tba';
            } else {
              contestant.date = result.released;
            }
            return contestant
          })
          return contestants;
        })
      )
  }
}
