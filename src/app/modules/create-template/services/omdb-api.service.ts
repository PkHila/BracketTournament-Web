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

    return this.httpClient.get<OMDbResponse>(searchUrl).pipe<OMDbSearchResult[]>(
      map(response => {
        return response.Search
      })).pipe<Contestant[]>(map(asdsad => {}))
      )


    const contestants: Array<Contestant> = JSON.parse(sessionStorage.getItem(searchUrl) || '[]');
    if (contestants.length === 0) {

      this.httpClient.get<OMDbResponse>(searchUrl)
        .subscribe({
          next: (response) => {
            response.Search.forEach(result => {
              const contestant: Contestant = {
                name: result.Title,
                img: result.Poster,
                date: result.Year,
                author: ''
              };
              contestants.push(contestant);
            })

          },
          error: (err) => {
            console.log('algo malió sal')
            // asi no hay que envolver en un try catch 
            // aunque tal vez sea mejor ya que si nos encontramos con un error en la API no depende de nosotros
          }
        });
    }
  });
}
}
