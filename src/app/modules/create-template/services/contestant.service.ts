import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contestant } from 'src/app/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContestantService {

  private baseUrl: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public postContestant(contestant: Contestant): Observable<Contestant> {
    return this.httpClient.post<Contestant>(`${this.baseUrl}/contestants`, contestant);
  }

  public addContestant(contestant: Contestant, selectedContestants: Contestant[]) {
    if (!selectedContestants.includes(contestant)) {
      selectedContestants.push(contestant);
    }
  }

  public removeContestant(contestant: Contestant, selectedContestants: Contestant[]) {
    selectedContestants.splice(selectedContestants.indexOf(contestant), 1);
  }
}
