import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestContestant } from 'src/app/core/models';
import { OMDbResponse, OMDbSearchResult } from './types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OMDbApiService {

  private baseUrl: string = "https://www.omdbapi.com";
  private seriesUrl: string = "type=series";
  private moviesUrl: string = "type=movie";
  private notAnEnvironmentApiKey: string = "I-C-U";

  constructor(private httpClient: HttpClient) { }

  // todo: 
  // agregar paginacion para mas de 10 resultados => &page=...
  // considerar que cada consulta va a sumar al daily limit
  // por ejemplo: consumir los 139 resultados de una busqueda de Star Wars Series son 14 consultas
  // podriamos mostrar un maximo de 20 que son solo 2 paginas
  // maybe use HttpClient.toPromise() @deprecated
  // firstValueFrom and lastValueFrom

  public getSeries(query: string): Promise<TestContestant[]> {
    return new Promise<TestContestant[]>((resolve, reject) => {

      const contestants = new Array<TestContestant>();
      let ok: boolean = true;

      this.httpClient.get<OMDbResponse>(`${this.baseUrl}/?s=${query}&apikey=${this.notAnEnvironmentApiKey}&${this.seriesUrl}`)
        .subscribe({

          next: (response) => {

            response.Search.forEach(result => { // how to declare callback for this case
              const contestant: TestContestant = {
                name: result.Title,
                img: result.Poster,
                date: result.Year,
                author: ''
              };
              contestants.push(contestant);
            })
          },
          error: (err) => {
            ok = false;
            console.log(err);

          }
        }); // unsubscribe?

      if (ok) {
        resolve(contestants);
      } else {
        reject(console.log('algo malió sal')); // asi no hay que envolver en un try catch aunque tal vez sea lo mejor ya que si nos encontramos con un error en la API no depende de nosotros
      }
    });
  }

  private mapContestant(result: OMDbSearchResult, contestants: TestContestant[]): void {

  }
  /* public async getSeries(query: string): Promise<TestContestant[]> { 

    return new Promise<TestContestant[]>((resolve, reject) => {

      const contestants = new Array<TestContestant>();

      fetch(`${this.baseUrl}/?s=${query}&apikey=${this.notAnEnvironmentApiKey}&${this.seriesUrl}`)
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              json.Search.forEach((result: { Title: string; Poster: string; Year: string; }) => { // habra una mejor manera? result se va a repetir en movies
                const contestant: TestContestant = {
                  name: result.Title,
                  img: result.Poster,
                  date: result.Year,
                  author: null
                };
                contestants.push(contestant);
              }); // este bloque se puede modularizar, va a ser identico independientemente del type
            }
            )
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  } */

  public getMovies(query: string) {

  }
}
