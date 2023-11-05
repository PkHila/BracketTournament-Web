import { Injectable } from '@angular/core';
import { TestContestant } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ContestantService {

  constructor() { }

  public removeContestant(contestant: TestContestant, selectedContestants: TestContestant[]) {
    // tal vez necesita mas proteccion
    selectedContestants.splice(selectedContestants.indexOf(contestant));
  }
  
  public addContestant(contestant: TestContestant, selectedContestants: TestContestant[]) {
    selectedContestants.push(contestant);
  }
}
