export enum Categories {
    movie = 'movie',
    series = 'series',
    games = 'games',
    anime = 'anime',
    manga = 'manga',
    albums = 'albums',
}

export enum LocaleCategories {
    movie = 'peliculas',
    series = 'series',
    games = 'juegos',
    anime = 'anime',
    manga = 'manga',
    albums = 'discos',
}

export const isCategory = (value: string): value is Categories => Object.values(Categories).includes(value as Categories);