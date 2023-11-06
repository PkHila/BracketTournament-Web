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

  public contestants: Array<Contestant> = [];
  public selectedContestants: Array<Contestant> = [];

  constructor(
    private omdbApiService: OMDbApiService,
    private contestantService: ContestantService) { }

  ngOnInit(): void {
    // testing init
    this.omdbApiService.getContestants('Star Wars', 'movie')
      .then((contestants) => { this.contestants = contestants })
  }

  public showContestants() {
    console.log(this.contestants);
  }

  public testingPurposes() {
    this.contestants.forEach(contestant => {
      this.contestantService.postContestant(contestant).subscribe({
        next: stuff => {
          /* console.log(stuff); */
        },
        error: err => {
          console.log(err);
        }
      });
    })
  }

  public removeContestant(contestant: Contestant) {
    this.contestantService.removeContestant(contestant, this.selectedContestants);
  }
  public addContestant(contestant: Contestant) {
    this.contestantService.addContestant(contestant, this.selectedContestants);
  }

}
