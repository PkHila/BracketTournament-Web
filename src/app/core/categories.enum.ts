export enum Categories {
    movies = 'movie',
    seires = 'series',
}

export const isCategory = (value: string): value is Categories => Object.values(Categories).includes(value as Categories);