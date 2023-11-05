import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestContestant } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OMDbApiService {

  private baseUrl: string = "https://www.omdbapi.com";
  private seriesUrl: string = "type=series";
  private moviesUrl: string = "type=movie";
  private notAnEnvironmentApiKey: string = "I-C-U";

  constructor(private httpClient: HttpClient) { }

  // maybe use HttpClient.toPromise()
  public async getSeries(query: string): Promise<TestContestant[]> { // todo: agregar paginacion para mas de 10 resultados

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
  }

  public getMovies(query: string) {

  }
}
