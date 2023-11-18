export interface Contestant {
    id?: number;
    name: string;
    img?: string;
    date?: string;
    author?: string;
}

export interface Template {
    id?: number;
    contestants: Array<Contestant> | Array<number>;
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
    firstContestantId: number;
    secondContestantId?: number;
}
