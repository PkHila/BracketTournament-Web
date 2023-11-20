import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContestantCardBigComponent } from '../components/contestant-card-big/contestant-card-big.component';
import { SharedModule } from "../../../shared/shared.module";
import { MatchupTrackerComponent } from "../components/matchup-tracker/matchup-tracker.component";
import { TournamentProgressComponent } from "../components/tournament-progress/tournament-progress.component";
@Component({
    selector: 'app-play-tournament',
    standalone: true,
    templateUrl: './play-tournament.component.html',
    styleUrls: ['./play-tournament.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ContestantCardBigComponent,
        SharedModule,
        MatchupTrackerComponent,
        TournamentProgressComponent
    ]
})
export class PlayTournamentComponent { }
