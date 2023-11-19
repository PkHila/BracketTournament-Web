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
    category: string;
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
    firstContestant: Contestant;
    secondContestant?: Contestant;
}
