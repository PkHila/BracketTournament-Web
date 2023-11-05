import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestContestant } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ContestantService {

  private baseUrl: string = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  public postContestant(contestant: TestContestant) {
    this.httpClient.post<TestContestant>(`${this.baseUrl}/contestants`, contestant);
  }

  public addContestant(contestant: TestContestant, selectedContestants: TestContestant[]) {
    selectedContestants.push(contestant);
  }

  public removeContestant(contestant: TestContestant, selectedContestants: TestContestant[]) {
    // tal vez necesita mas proteccion
    selectedContestants.splice(selectedContestants.indexOf(contestant));
  }
}
