export interface Contestant {
    id?: number;
    name: string;
    img?: string;
    date?: string;
    author?: string;
}

export interface Template {
    id?: number;
    contestantIds: Array<number>;
}

export interface PlayedTournament {
    id?: number;
    contestants: Array<Contestant> | Array<number>;
    rounds: Array<Round>;
}

export interface Round {
    position: number;
    matches: Array<Match>;
}

export interface Match {
    firstContestantId: number;
    secondContestantId?: number;
}
