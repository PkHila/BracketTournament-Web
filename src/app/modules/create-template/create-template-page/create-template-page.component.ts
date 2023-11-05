import { Component, OnInit } from '@angular/core';
import { TestContestant } from 'src/app/core/models';
import { OMDbApiService } from '../services/omdb-api.service';
import { ContestantService } from '../services/contestant.service';

@Component({
  selector: 'app-create-template-page',
  templateUrl: './create-template-page.component.html',
  styleUrls: ['./create-template-page.component.css']
})
export class CreateTemplatePageComponent implements OnInit {

  public contestants: Array<TestContestant> = [];
  public selectedContestants: Array<TestContestant> = [];

  constructor(
    private omdbApiService: OMDbApiService, 
    private contestantService: ContestantService) { }

  ngOnInit(): void {
    // testing init
    this.omdbApiService.getContestants('Star Wars', 'series')
      .then((contestants) => { this.contestants = contestants })
  }

  public removeContestant(contestant: TestContestant) {
    this.contestantService.removeContestant(contestant, this.selectedContestants);
  }
  public addContestant(contestant: TestContestant) {
    this.contestantService.addContestant(contestant, this.selectedContestants);
  }

}
