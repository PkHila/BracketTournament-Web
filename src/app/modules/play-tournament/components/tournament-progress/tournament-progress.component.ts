import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class TournamentProgressComponent { }
