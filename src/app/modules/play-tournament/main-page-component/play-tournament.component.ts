import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContestantCardBigComponent } from '../components/contestant-card-big/contestant-card-big.component';

@Component({
  selector: 'app-play-tournament',
  standalone: true,
  imports: [
    CommonModule,
    ContestantCardBigComponent
  ],
  templateUrl: './play-tournament.component.html',
  styleUrls: ['./play-tournament.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayTournamentComponent { }
