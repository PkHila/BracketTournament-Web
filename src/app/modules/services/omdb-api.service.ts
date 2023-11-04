import { Injectable } from '@angular/core';
import { TestContestant } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OMDbApiService {

/* fetch("https://www.omdbapi.com/?s=star%20wars&apikey=xxxxxxxx").then(resp => {
    if(resp.ok) {
        console.log(resp);
        resp.json().then(json => {
            console.log(json);
        })
    }
}).catch(err => {
    console.log(err);
}) */

  private baseUrl: string = "https://www.omdbapi.com";
  private seriesUrl: string = "type=series";
  private moviesUrl: string = "type=movie";
  private notAnEnvironmentApiKey: string = "I-C-U";

  constructor() { }

  public async getSeries(query: string): Promise<TestContestant[]> { // todo: agregar paginacion para mas de 10 resultados

    return new Promise<TestContestant[]>((resolve, reject) => {
      const contestants = new Array<TestContestant>();

      fetch(`${this.baseUrl}/?s=${query}&apikey=${this.notAnEnvironmentApiKey}&${this.seriesUrl}`)
        .then(response => {
          if(response.ok) {
            response.json().then(
              // mappear la respuesta a un arreglo de contestants 
            )
          }
        })
        .catch(err => {
          console.log(err);        
        })
    })
    
  }

  public getMovies(query: string) {

  }
}
