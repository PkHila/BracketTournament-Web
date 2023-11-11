import { Component, OnInit } from '@angular/core';
import { OMDbApiService } from '../services/omdb-api.service';
import { ContestantService } from '../services/contestant.service';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-create-template-page',
  templateUrl: './create-template-page.component.html',
  styleUrls: ['./create-template-page.component.css']
})
export class CreateTemplatePageComponent implements OnInit {

  public contestants?: Array<Contestant>;
  public selectedContestants: Array<Contestant> = [];

  constructor(
    private omdbApiService: OMDbApiService,
    private contestantService: ContestantService) { }

  ngOnInit(): void {
    // testing init
    this.omdbApiService.getContestants('Star Wars', 'movie')
      .then((contestants) => { this.contestants = contestants })
  }

  public onContestantSelected(selectedContestant: Contestant): void {
    this.selectedContestants.push(selectedContestant);
  }

  public onRemoveContestant(contestant: Contestant) {
    /* feature disabled for unintended cascade deletion */
    /* this.contestantService.removeContestant(contestant, this.selectedContestants); */
    console.log("feature disabled");
    
  }

}
