import { Injectable } from '@angular/core';
import { ApiService, QueryParams } from './types/interfaces';
import { Observable } from 'rxjs';
import { Contestant } from 'src/app/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LastFMApiService implements ApiService {

  private baseUrl = "";

  constructor() { }

  getContestants(queryParams: QueryParams): Observable<Contestant[]> {
    throw new Error('Method not implemented.');
  }
  checkIfImgEmpty(source: string): string {
    if (source) {
      return "/assets/img_not_found.png";
    } else {
      return "/assets/img_not_found.png";
    }
  }

}
