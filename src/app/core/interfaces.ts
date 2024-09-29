export interface Contestant {
    id?: number;
    name: string;
    img?: string;
    date?: string;
    author?: string;
    tournamentsPlayed?: number;
    matchesPlayed?: number;
    matchesWon?: number;
    tournamentsWon?: number;
}

export interface Template {
    id?: number;
    contestants?: Array<Contestant>;
    contestantIds?: Array<number>;
    templateName: string;
    normalizedTemplateName?: string;
    category: string;
    coverImg?: string;
    timesPlayed?: number;
}

export interface Tournament {
    id?: number;
    template: Template;
    rounds: Array<Round>;
}

export interface Round {
    position: number;
    matches: Array<Match>;
}

export interface Match {
    firstContestant?: Contestant;
    firstContestantId?: number;
    secondContestant?: Contestant;
    secondContestantId?: number;
}

export interface Loser {
    contestantName: string;
    contestantCoverImg: string;
    lostInRound: string;
    lostToContestant: string;
}

export interface PlayedTournament {
    firstPlaceName: string;
    firstPlaceCoverImg: string;
    secondPlace: Loser;
    thirdPlaces: Array<Loser>;
    losers: Array<Loser>;
}
