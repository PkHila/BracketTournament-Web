import { Component, Input } from '@angular/core';
import { Contestant } from 'src/app/core/interfaces';

@Component({
  selector: 'app-contestant-stat',
  templateUrl: './contestant-stat.component.html',
  styleUrls: ['./contestant-stat.component.scss']
})


export class ContestantStatComponent {
  @Input() contestant!: Contestant;
  public tournamentWinRate: number = this.calculateMatchWinRate();

  private calculateTournamentWinRate():number {
    if(this.contestant.tournamentsPlayed !=0 && this.contestant.tournamentsPlayed && this.contestant.tournamentsWon){   
      return this.contestant.tournamentsWon * 100 / this.contestant.tournamentsWon;
    }
    else{
      return 0;
    }
  
  }

  private calculateMatchWinRate():number {
    if(this.contestant.matchesPlayed && this.contestant.matchesWon && this.contestant.matchesPlayed !=0){   
      return this.contestant.matchesWon * 100 / this.contestant.matchesPlayed;
    }
    else{
      return 0;
    }
  
  }
  
}
