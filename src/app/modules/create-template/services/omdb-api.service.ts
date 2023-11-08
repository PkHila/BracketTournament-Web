import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OMDbResponse, OMDbSearchResult } from './types/interfaces';
import { environment } from 'src/environments/environment.development';
import { Contestant } from 'src/app/core/interfaces';
import { map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OMDbApiService {

  private baseUrl: string = "https://www.omdbapi.com";
  /* "type=series"
     "type=movie" */

  constructor(private httpClient: HttpClient) { }

  // todo / log: 
  // agregar paginacion para mas de 10 resultados => &page=...
  // considerar que cada consulta va a sumar al daily limit
  // por ejemplo: consumir los 139 resultados de una busqueda de Star Wars Series son 14 consultas
  // podriamos mostrar un maximo de 20 que son solo 2 paginas

  //JSON.parse(sessionStorage.getItem(searchUrl) || '[]');
  //sessionStorage.setItem(`${query.toLocaleLowerCase()}&${type}`, JSON.stringify(contestants));
  public getContestants(query: string, type: string): Observable<Contestant[]> {
    const searchUrl: string = `${this.baseUrl}/?s=${query.toLocaleLowerCase()}&apikey=${environment.omdbApiKey}&type=${type}`;

    return this.httpClient.get<OMDbResponse>(searchUrl)
      .pipe<OMDbSearchResult[]>(
        map(response => {
          return response.Search
        }))
      .pipe<Contestant[]>(
        map(results => {
          const contestants = results.map(result => <Contestant>{
            name: result.Title,
            img: result.Poster,
            date: result.Year,
            author: ''
          })
          return contestants;
        }))
  }
}
