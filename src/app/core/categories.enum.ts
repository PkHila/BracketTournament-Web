export enum Categories {
    movie = 'movie',
    series = 'series',
    games = 'games',
    anime = 'anime',
    manga = 'manga',
}

export enum LocaleCategories {
    movie = 'peliculas',
    games = 'juegos',
}

export const isCategory = (value: string): value is Categories => Object.values(Categories).includes(value as Categories);