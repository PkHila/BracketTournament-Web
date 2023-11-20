import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-matchup-tracker',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './matchup-tracker.component.html',
  styleUrls: ['./matchup-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchupTrackerComponent {

  @Input() currentMatch!: number;
  @Input() totalMatches!: number;
 }
