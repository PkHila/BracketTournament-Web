import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, JikanMangaData, JikanResponse, QueryParams } from './types/interfaces';
import { Observable, map } from 'rxjs';
import { Contestant } from 'src/app/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JikanMangaApiService implements ApiService {
  private baseUrl = "https://api.jikan.moe/v4";

  constructor(private http: HttpClient) { }

  checkIfImgEmpty(source: string | null): string {
    if (source) {
      return source;
    }
    else {
      return "/assets/img_not_found.png";
    }
  }

  getContestants(queryParams: QueryParams): Observable<Contestant[]> {

    const searchUrl = `${this.baseUrl}/${queryParams.category}?sfw&q=${queryParams.query}&limit=20`;

    return this.http.get<JikanResponse>(searchUrl)
      .pipe<JikanMangaData[]>(
        map(response => {
          if (response.pagination.items.count === 0) {
            throw new Error('No se encontraron resultados');
          }
          const animeData: JikanMangaData[] = response.data as JikanMangaData[];
          return animeData;
        })
      )
      .pipe<Contestant[]>(
        map(results => {
          const contestants = results.map<Contestant>(result => {
            const contestant: Contestant = {
              name: result.title
            }
            if (result.published.prop.from.year) {
              contestant.date = result.published.prop.from.year.toString(10);
            } else {
              contestant.date = 'proximamente'
            }
            if (result.images) {
              contestant.img = this.checkIfImgEmpty(result.images.jpg.image_url);
            } else {
              contestant.img = this.checkIfImgEmpty(null);
            }
            const author = result.authors.at(0);
            if (author) {
              contestant.author = author.name;
            } else {
              contestant.author = 'N/A';
            }
            return contestant;
          })
          return contestants;
        })
      )
  }
}
