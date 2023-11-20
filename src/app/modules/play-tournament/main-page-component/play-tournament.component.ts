import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ContestantCardBigComponent } from '../components/contestant-card-big/contestant-card-big.component';
import { SharedModule } from "../../../shared/shared.module";
import { MatchupTrackerComponent } from "../components/matchup-tracker/matchup-tracker.component";
import { TournamentProgressComponent } from "../components/tournament-progress/tournament-progress.component";
import { Contestant, Round, Tournament } from 'src/app/core/interfaces';
import { TournamentService } from 'src/app/core/services/Tournament.service';
@Component({
    selector: 'app-play-tournament',
    standalone: true,
    templateUrl: './play-tournament.component.html',
    styleUrls: ['./play-tournament.component.scss'],
    /* changeDetection: ChangeDetectionStrategy.OnPush, */
    imports: [
        CommonModule,
        ContestantCardBigComponent,
        SharedModule,
        MatchupTrackerComponent,
        TournamentProgressComponent
    ]
})
export class PlayTournamentComponent implements OnInit {

    @Input() tournament!: Tournament;
    @Input() totalRounds!: number;
    public leftContestant?: Contestant;
    public rightContestant?: Contestant;
    private currentRound = 0;
    public currentMatch = 0;
    public totalMatchesForCurrentRound = 0;
    public winner?: Contestant; // set left & right to undefined, set winner & *ngIF to display winner & endTournament

    constructor(private tournamentService: TournamentService) { }

    ngOnInit(): void {
        this.totalRounds = 3;
        this.tournamentService.getTournament("Star Wars").subscribe({
            next: t => {
                this.tournament = t;
                this.tournamentService.initiateFirstRound(this.tournament, this.totalRounds);
                console.log(this.tournament);
                this.leftContestant = this.tournament.rounds[0].matches[0].firstContestant;
                this.rightContestant = this.tournament.rounds[0].matches[0].secondContestant;
                this.totalMatchesForCurrentRound = this.tournament.rounds[0].matches.length;
            },
            error: err => console.log(err)
        });
    }

    public onVote(votedContestant: Contestant) {
        if (this.tournamentService.isNotLastMatch(this.currentRound, this.totalRounds)) {
            this.tournamentService.vote(this.tournament, this.currentRound, this.totalRounds, votedContestant);
            this.currentMatch++;
            if (this.currentMatch === this.tournament.rounds[this.currentRound].matches.length) {
                this.currentMatch = 0;
                this.currentRound++;
                this.totalMatchesForCurrentRound = this.tournament.rounds[this.currentRound].matches.length;
            }
            this.leftContestant = this.tournament.rounds[this.currentRound].matches[this.currentMatch].firstContestant;
            this.rightContestant = this.tournament.rounds[this.currentRound].matches[this.currentMatch].secondContestant;
            console.log(this.tournament);

        } else {
            this.leftContestant = undefined;
            this.rightContestant = undefined;
            this.winner = votedContestant;
            console.log("winner");
            console.log(this.winner);
            console.log(this.tournament);
        }
    }
}
