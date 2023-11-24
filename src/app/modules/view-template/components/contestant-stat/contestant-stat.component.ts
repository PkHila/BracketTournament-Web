import { Component, Input, OnInit } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';
import { ContestantService } from 'src/app/core/services/Contestant.service';

@Component({
  selector: 'app-contestant-stat',
  templateUrl: './contestant-stat.component.html',
  styleUrls: ['./contestant-stat.component.scss']
})


export class ContestantStatComponent implements OnInit {
  @Input() contestant!: Contestant;
  public tournamentWinRate!: number;
  public matchWinRate!: number

  constructor(private contestantService: ContestantService) { }

  ngOnInit(): void {
    this.tournamentWinRate = this.contestantService.calculateTournamentWinRate(this.contestant);
    this.matchWinRate = this.contestantService.calculateMatchWinRate(this.contestant);
    this.contestantService.initializeUndefinedStatistics(this.contestant);
  }
}
