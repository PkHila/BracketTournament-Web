import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ContestantCardBigComponent } from '../components/contestant-card-big/contestant-card-big.component';
import { SharedModule } from "../../../shared/shared.module";
import { MatchupTrackerComponent } from "../components/matchup-tracker/matchup-tracker.component";
import { TournamentProgressComponent } from "../components/tournament-progress/tournament-progress.component";
import { Contestant, Tournament } from 'src/app/core/interfaces';
import { TournamentService } from 'src/app/core/services/Tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
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

    public tournament!: Tournament;
    public totalRounds!: number;
    public leftContestant?: Contestant;
    public rightContestant?: Contestant;
    public currentRound = 0;
    public currentMatch = 0;
    public totalMatchesForCurrentRound = 0;
    public winner?: Contestant;

    constructor(
        private tournamentService: TournamentService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        let templateName = this.activatedRoute.snapshot.paramMap.get('templateName');
        let roundsParam = this.activatedRoute.snapshot.paramMap.get('totalRounds');
        if (templateName !== null && roundsParam !== null) {
            this.totalRounds = parseInt(roundsParam);
            this.tournamentService.getTournament(templateName).subscribe({
                next: t => {
                    this.tournament = t;
                    this.tournamentService.handleTimesPlayed(this.tournament);
                    this.tournamentService.initiateFirstRound(this.tournament, this.totalRounds);
                    this.leftContestant = this.tournament.rounds[0].matches[0].firstContestant;
                    this.rightContestant = this.tournament.rounds[0].matches[0].secondContestant;
                    this.totalMatchesForCurrentRound = this.tournament.rounds[0].matches.length;
                },
                error: err => console.log(err)
            });
        }
    }

    public onVote(votedContestant: Contestant) {
        if (this.tournamentService.isNotLastMatch(this.currentRound, this.totalRounds)) {
            this.tournamentService.vote(this.tournament, this.currentMatch, this.currentRound, this.totalRounds, votedContestant);
            this.currentMatch++;
            if (this.currentMatch === this.tournament.rounds[this.currentRound].matches.length) {
                this.currentMatch = 0;
                this.currentRound++;
                this.totalMatchesForCurrentRound = this.tournament.rounds[this.currentRound].matches.length;
            }
            this.leftContestant = this.tournament.rounds[this.currentRound].matches[this.currentMatch].firstContestant;
            this.rightContestant = this.tournament.rounds[this.currentRound].matches[this.currentMatch].secondContestant;
        } else {
            this.tournamentService.handleMatchesPlayed(this.leftContestant!);
            this.tournamentService.handleMatchesPlayed(this.rightContestant!);
            this.tournamentService.handleMatchesWon(votedContestant);
            this.tournamentService.handleTournamentsWon(votedContestant);
            this.leftContestant = undefined;
            this.rightContestant = undefined;
            this.winner = votedContestant;
            this.tournamentService.postTournament(this.tournament, votedContestant).subscribe({
                next: pl => {
                    console.log(pl);
                    
                }
            })
        }
    }

    public onTournamentConcluded() {
        this.router.navigate([`view-template/${this.tournament.template.templateName}`])
    }
}
