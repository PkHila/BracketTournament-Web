import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestContestant } from 'src/app/core/models';
import { OMDbResponse } from './types/interfaces';
import { environment } from 'src/environments/environment.development';

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

  public getContestants(query: string, type: string): Promise<TestContestant[]> {
    return new Promise<TestContestant[]>((resolve, reject) => {

      const searchUrl: string = `${this.baseUrl}/?s=${query.toLocaleLowerCase()}&apikey=${environment.omdbApiKey}&type=${type}`;

      const contestants: Array<TestContestant> = JSON.parse(sessionStorage.getItem(searchUrl) || '[]');
      if (contestants.length === 0) {
        
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
                })
              sessionStorage.setItem(`${query.toLocaleLowerCase()}&${type}`, JSON.stringify(contestants));
              resolve(contestants);
            },
            error: (err) => {
              reject(console.log('algo malió sal'));
              // asi no hay que envolver en un try catch 
              // aunque tal vez sea mejor ya que si nos encontramos con un error en la API no depende de nosotros
            }
          });
      } else {
        resolve(contestants); // no se puede evitar hacer esto, sino hay condicion de carerra
      }
    });
  }
}
