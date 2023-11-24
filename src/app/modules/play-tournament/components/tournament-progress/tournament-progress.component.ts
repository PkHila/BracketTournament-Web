import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TournamentService } from 'src/app/core/services/Tournament.service';

@Component({
  selector: 'app-tournament-progress',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './tournament-progress.component.html',
  styleUrls: ['./tournament-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TournamentProgressComponent implements OnInit, OnChanges{
  @Input() totalRounds!: number;
  @Input() currentRound!: number;
  public roundName?: string;
  
  constructor (private service: TournamentService){

  }
  
  ngOnInit(): void {
    this.roundName = this.service.getRoundName(this.currentRound, this.totalRounds);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["currentRound"]){
      if (this.currentRound < 5) {
        this.roundName = this.service.getRoundName(this.currentRound, this.totalRounds);
      } else {
        this.roundName = "Top " + 2 ** this.currentRound; 
      }
    }
  }


}
