import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-play-tournament',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './play-tournament.component.html',
  styleUrls: ['./play-tournament.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayTournamentComponent { }
