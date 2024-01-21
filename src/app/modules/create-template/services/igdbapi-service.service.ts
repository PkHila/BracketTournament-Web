import { Injectable } from '@angular/core';
import { ApiService, IGDBResults, QueryParams, twitchAuthResponse } from './types/interfaces';
import { Observable, map } from 'rxjs';
import { Contestant } from 'src/app/core/interfaces';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IGDBApiService implements ApiService {

  private baseUrl = "https://api.igdb.com/v4";
  private twitchUrl = "https://id.twitch.tv/oauth2/token";
  private access_token = localStorage.getItem("tmdbToken");

  constructor(private http: HttpClient) {
    // || access_token.expires_in
    if (!this.access_token) {
      fetch(
        `${this.twitchUrl}?client_id=${environment.twitchClientId}&client_secret=${environment.twitchClientSecret}&grant_type=client_credentials`,
        {
          method: 'POST'
        }
      ).then(response => {
        response.json()
          .then(response => {
            this.access_token = response.access_token;
            //localStorage.setItem("tmdbToken", this.access_token!);
          })
      })
      /* http.post<twitchAuthResponse>(
        `${this.twitchUrl}?client_id=${environment.twitchClientId}&client_secret=${environment.twitchClientSecret}&grant_type=client_credentials`,
        {}
      ).subscribe({
        next: (response) => {
          this.access_token = response.access_token;
          localStorage.setItem("tmdbToken", this.access_token);
        }
      }) */
    }
  }
  getContestants(queryParams: QueryParams): Observable<Contestant[]> {
    const searchUrl = `${this.baseUrl}/games`;
    const auth = `Bearer ${this.access_token}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: auth,
        'Client-ID': environment.twitchClientId
      })
    };
    const body = `search "${queryParams.query}"; fields name, release_dates.y, cover.image_id, involved_companies.developer, involved_companies.company.name;`;
    console.log(httpOptions);
    
    return this.http.post<IGDBResults[]>(searchUrl, body, httpOptions) // cors
      .pipe<Contestant[]>(
        map(results => {
          const contestants = results.map<Contestant>(result => {
            const contestant: Contestant = {
              name: result.name
            };
            if (result.cover) {
              contestant.img = this.checkIfImgEmpty(result.cover.image_id);
            } else {
              contestant.img = this.checkIfImgEmpty(null);
            }
            if (result.involved_companies) {
              // todo filter o algo asi
            } else {
              contestant.author = "N/A";
            }
            if (result.release_dates) {
              // todo array stuff
            } else {
              contestant.date = "N/A";
            }
            return contestant;
          })
          return contestants;
        })
      )
  }
  checkIfImgEmpty(source: string | null): string {
    if (source) {
      return `https//images.igdb.com/igdb/image/upload/t_cover_big/${source}.jpg`;
    }
    else {
      return "/assets/img_not_found.png";
    }
  }
}
