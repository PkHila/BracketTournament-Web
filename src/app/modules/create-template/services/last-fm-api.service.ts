import { Injectable } from '@angular/core';
import { ApiService, LastFMResponse, QueryParams } from './types/interfaces';
import { Observable, map } from 'rxjs';
import { Contestant } from 'src/app/core/interfaces';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LastFMApiService implements ApiService {

  private baseUrl = "https://ws.audioscrobbler.com/2.0";

  constructor(private http: HttpClient) { }

  getContestants(queryParams: QueryParams): Observable<Contestant[]> {
    
    const searchUrl = `${this.baseUrl}/?method=album.search&album=${queryParams.query}&api_key=${environment.lastfmApiKey}&format=json&limit=20`;

    return this.http.get<LastFMResponse>(searchUrl)
    .pipe<Contestant[]>(
      map(response => {
        if (response.results.albummatches.album.length === 0) {
          throw new Error('No se encontraron resultados');
        } else {
          const contestants = response.results.albummatches.album.map<Contestant> (album => {
            const img = album.image.at(-1)?.['#text'];
            const contestant: Contestant = {
              name: album.name,
              author: album.artist,
              date: '',
              img: this.checkIfImgEmpty(img!),
            }
            return contestant;
          })
          return contestants;
        }
      })
    )
  }
  checkIfImgEmpty(source: string): string {
    if (source) {
      return source;
    } else {
      return "assets/img_not_found.png";
    }
  }

}
