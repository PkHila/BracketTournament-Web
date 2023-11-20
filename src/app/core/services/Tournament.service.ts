import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Contestant, Match, Round, Tournament } from '../interfaces';
import { TemplateService } from './Template.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private baseUrl: string = "http://localhost:3000";

  constructor(private templateService: TemplateService) { }

  public getTournament(templateName: string): Observable<Tournament> {
    return this.templateService.getTemplateByName(templateName).pipe<Tournament>(
      map(template => {
        const tournament: Tournament = {
          template: template,
          rounds: []
        }
        return tournament;
      })
    )
  }

  public initiateFirstRound(tournament: Tournament, totalRounds: number) {
    const shuffle = <T>(array: T[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    /* tournament.rounds = [];
    console.log(tournament); */
    const shuffledContestants = shuffle(tournament.template.contestants!);
    /* console.log(shuffledContestants); */

    const totalMatchesForFirstRound = 2 ** totalRounds / 2;
    const firstRound: Round = {
      position: 0,
      matches: []
    }
    let contestantsPushed = 0;
    let contestantIndex = 0;
    while (contestantIndex < totalMatchesForFirstRound) {
      const match: Match = {
        firstContestant: shuffledContestants[contestantIndex]
      }
      firstRound.matches.push(match);
      contestantIndex++
      contestantsPushed++;
    }
    let roundIndex = 0;
    while (contestantsPushed < shuffledContestants.length) {
      firstRound.matches[roundIndex].secondContestant = shuffledContestants[contestantIndex];
      roundIndex++;
      contestantIndex++;
      contestantsPushed++;
    }
    tournament.rounds.push(firstRound);
    this.spawnNewRoundIfNeeded(tournament, 0, totalRounds);
  }

  public spawnNewRoundIfNeeded(tournament: Tournament, currentRound: number, totalRounds: number): void {
    if (tournament.rounds[currentRound].matches.length > 1 &&
      tournament.rounds.at(currentRound + 2) === undefined &&
      currentRound + 1 < totalRounds -1) {
      const newRound: Round = {
        position: currentRound + 2,
        matches: []
      }
      tournament.rounds.push(newRound);
    }
  }

  public vote(tournament: Tournament, currentRound: number, totalRounds: number, winner: Contestant) {
    if (tournament.rounds[currentRound + 1].matches.length === 0 ||
      tournament.rounds[currentRound + 1].matches.at(-1)!.secondContestant !== undefined) {
      const newMatch: Match = {
        firstContestant: winner
      };
      tournament.rounds[currentRound + 1].matches.push(newMatch);
    } else {
      tournament.rounds[currentRound + 1].matches.at(-1)!.secondContestant = winner;
    }
    this.spawnNewRoundIfNeeded(tournament, currentRound, totalRounds);
  }

  public isNotLastMatch(currentRound: number, totalRounds: number): boolean {
    let ans = true;
    if (currentRound === totalRounds - 1) {
      ans = false;
    }
    return ans;
  }

}
