import { Component, Input, OnInit } from '@angular/core';
import { OMDbApiService } from '../services/omdb-api.service';
import { ContestantService } from '../services/contestant.service';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-create-template-page',
  templateUrl: './create-template-page.component.html',
  styleUrls: ['./create-template-page.component.scss']
})
export class CreateTemplatePageComponent implements OnInit {

  public contestants?: Array<Contestant>;
  public selectedContestants: Array<Contestant> = []; // usar un validador asincronico para validar la no repeticion de nombres de plantillas
  @Input() category!: string;

  constructor(
    private omdbApiService: OMDbApiService,
    private contestantService: ContestantService) { }

  ngOnInit(): void {
    // testing init
    this.category = 'movie'
    this.omdbApiService.getContestants('Star Wars', 'movie').subscribe({
      next: (contestants) => {
        this.contestants = contestants
      },
      error: () => {
        console.log("error");
      }
    })
  }

  public onContestantSelected(selectedContestant: Contestant): void {
    this.contestantService.addContestant(selectedContestant, this.selectedContestants);
  }

  public onRemoveContestant(selectedContestant: Contestant): void {
    this.contestantService.removeContestant(selectedContestant, this.selectedContestants);
  }

  public onSearch(searchTerm: string): void {
    this.omdbApiService.getContestants(searchTerm, this.category).subscribe({
      next: (contestants) => {
        this.contestants = contestants
      },
      error: () => {
        console.log("error");
      }
    })
  }
}
