import { Injectable } from '@angular/core';
import { Observable, map, of, } from 'rxjs';
import { Contestant, Loser, Match, PlayedTournament, Round, Tournament } from '../interfaces';
import { TemplateService } from './Template.service';
import { Rounds } from '../rounds.enum';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

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

  public postTournament(tournament: Tournament): Observable<boolean> {
    return this.templateService.putTemplate(tournament.template, tournament.template.id!).pipe(
      map(() => {
        return true
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
    this.handleContestantIds(tournament.template.contestants!);
    const shuffledContestants = shuffle(tournament.template.contestants!);

    tournament.template.contestants = shuffledContestants;

    const totalContestantsToArrange = 2 ** totalRounds
    const totalMatchesForFirstRound = totalContestantsToArrange / 2;
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
      this.handleTournamentsPlayed(match.firstContestant!);
      firstRound.matches.push(match);
      contestantIndex++
      contestantsPushed++;
    }
    let roundIndex = 0;
    while (contestantsPushed < shuffledContestants.length && contestantsPushed < totalContestantsToArrange) {
      firstRound.matches[roundIndex].secondContestant = shuffledContestants[contestantIndex];
      this.handleTournamentsPlayed(firstRound.matches[roundIndex].secondContestant!);
      roundIndex++;
      contestantIndex++;
      contestantsPushed++;
    }
    tournament.rounds.push(firstRound);
    const secondRound: Round = {
      position: 1,
      matches: []
    }
    tournament.rounds.push(secondRound);
  }

  private handleContestantIds(contestants: Contestant[]) {
    let lastId = 1;
    contestants.forEach(contestant => {
      if (contestant.id !== undefined && contestant.id > lastId) {
        lastId = contestant.id;
      }
    })
    contestants.forEach(contestant => {
      if (contestant.id === undefined) {
        contestant.id = lastId;
        lastId++;
      }
    })
  }

  private handleTournamentsPlayed(contestant: Contestant): void {
    if (contestant.tournamentsPlayed === undefined) {
      contestant.tournamentsPlayed = 0;
    }
    contestant.tournamentsPlayed++;
  }

  public spawnNewRoundIfNeeded(tournament: Tournament, currentRound: number, totalRounds: number): void {
    if (tournament.rounds[currentRound].matches.length > 1 &&
      tournament.rounds.at(currentRound + 2) === undefined &&
      currentRound + 1 < totalRounds - 1) {
      const newRound: Round = {
        position: currentRound + 2,
        matches: []
      }
      tournament.rounds.push(newRound);
    }
  }

  public vote(tournament: Tournament, currentMatch: number, currentRound: number, totalRounds: number, winner: Contestant, playedTournament: PlayedTournament) {
    if (tournament.rounds[currentRound + 1].matches.length === 0 ||
      tournament.rounds[currentRound + 1].matches.at(-1)!.secondContestant !== undefined) {
      const newMatch: Match = {
        firstContestant: winner
      };
      tournament.rounds[currentRound + 1].matches.push(newMatch);
    } else {
      tournament.rounds[currentRound + 1].matches.at(-1)!.secondContestant = winner;
    }
    const firstContestant = tournament.rounds[currentRound].matches[currentMatch].firstContestant;
    const secondContestant = tournament.rounds[currentRound].matches[currentMatch].secondContestant;
    this.handleMatchesPlayed(firstContestant);
    this.handleMatchesPlayed(secondContestant);
    this.handleMatchesWon(winner);
    this.handleTournamentResults(winner, firstContestant!, secondContestant, currentRound, totalRounds, playedTournament)
    this.spawnNewRoundIfNeeded(tournament, currentRound, totalRounds);
  }

  public handleTournamentResults(winner: Contestant, firstContestant: Contestant, secondContestant: Contestant | undefined, currentRound: number, totalRounds: number, playedTournament: PlayedTournament) {
    if (secondContestant) {
      const loser: Loser = {
        contestantName: "",
        contestantCoverImg: "",
        lostInRound: this.getRoundName(currentRound, totalRounds),
        lostToContestant: winner.name
      };
      if (firstContestant === winner) {
        loser.contestantName = secondContestant.name;
        loser.contestantCoverImg = secondContestant.img!;
      } else {
        loser.contestantName = firstContestant.name;
        loser.contestantCoverImg = firstContestant.img!;
      }
      playedTournament.losers.push(loser)
    }
  }

  public handleMatchesPlayed(contestant: Contestant | undefined): void {
    if (contestant !== undefined) {
      if (contestant.matchesPlayed === undefined) {
        contestant.matchesPlayed = 0;
      }
      contestant.matchesPlayed++;
    }
  }

  public handleMatchesWon(contestant: Contestant): void {
    if (contestant.matchesWon === undefined) {
      contestant.matchesWon = 0;
    }
    contestant.matchesWon++;
  }

  public handleTournamentsWon(contestant: Contestant): void {
    if (contestant.tournamentsWon === undefined) {
      contestant.tournamentsWon = 0;
    }
    contestant.tournamentsWon++;
  }

  public isNotLastMatch(currentRound: number, totalRounds: number): boolean {
    let ans = true;
    if (currentRound === totalRounds - 1) {
      ans = false;
    }
    return ans;
  }

  public handleTimesPlayed(tournament: Tournament): void {
    if (tournament.template.timesPlayed === undefined) {
      tournament.template.timesPlayed = 0;
    }
    tournament.template.timesPlayed++;
  }

  public getRoundName(currentRound: number, totalRounds: number): string {
    const roundDifference = totalRounds - currentRound;
    if (roundDifference > 0 && roundDifference <= Object.keys(Rounds).length / 2) {
      const roundName = Rounds[roundDifference] as keyof typeof Rounds;
      return roundName
    }
    return "undefined";
  }
}
