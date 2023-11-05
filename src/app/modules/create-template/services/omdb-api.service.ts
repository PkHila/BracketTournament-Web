import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestContestant } from 'src/app/core/models';
import { OMDbResponse } from './types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OMDbApiService {

  private baseUrl: string = "https://www.omdbapi.com";
  /* private seriesUrl: string = "type=series";
  private moviesUrl: string = "type=movie"; */
  private notAnEnvironmentApiKey: string = "4c1747e7";// "I-C-U";

  constructor(private httpClient: HttpClient) { }

  // todo / log: 
  // agregar paginacion para mas de 10 resultados => &page=...
  // considerar que cada consulta va a sumar al daily limit
  // por ejemplo: consumir los 139 resultados de una busqueda de Star Wars Series son 14 consultas
  // podriamos mostrar un maximo de 20 que son solo 2 paginas
  // maybe use HttpClient.toPromise() @deprecated
  // firstValueFrom and lastValueFrom

  public getContestants(query: string, type: string): Promise<TestContestant[]> {
    return new Promise<TestContestant[]>((resolve, reject) => {

      const contestants: Array<TestContestant> = [];
      let apiOk: boolean = true;
      let storedResult: boolean = false;
      const searchUrl: string = `${this.baseUrl}/?s=${query.toLocaleLowerCase()}&apikey=${this.notAnEnvironmentApiKey}&type=${type}`

      const sesionStoredSearchResults: Array<TestContestant> = JSON.parse(sessionStorage.getItem(searchUrl) || '[]');
      if (sesionStoredSearchResults.length > 0) {
        storedResult = true;
      } else {

        this.httpClient.get<OMDbResponse>(searchUrl)
          .subscribe({
            next: (response) => {
              response.Search.forEach(result => {
                const contestant: TestContestant = {
                  name: result.Title,
                  img: result.Poster,
                  date: result.Year,
                  author: ''
                };
                contestants.push(contestant);
                // resolve aca
              })
            },
            error: (err) => {
              apiOk = false;
              console.log(err);
              // reject aca
            }
          });
      } // unsubscribe?

      if (apiOk) {
        /* if (!storedResult) {
          sessionStorage.setItem(`${query.toLocaleLowerCase()}&${type}`, JSON.stringify(contestants));
        } */
        resolve(contestants);
      } else {
        reject(console.log('algo malió sal')); // asi no hay que envolver en un try catch aunque tal vez sea mejor ya que si nos encontramos con un error en la API no depende de nosotros
      }
    });
  }
}
