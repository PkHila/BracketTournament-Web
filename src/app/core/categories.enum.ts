export enum Categories {
    movies = 'movie',
    series = 'series',
    games = 'games',
}

export const isCategory = (value: string): value is Categories => Object.values(Categories).includes(value as Categories);