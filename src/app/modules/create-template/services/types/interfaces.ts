import { Observable } from "rxjs";
import { Contestant } from "src/app/core/interfaces";

export interface ApiService {
    getContestants(queryParams: QueryParams): Observable<Contestant[]>;
    checkIfImgEmpty(source: string): string;
}

export interface QueryParams {
    query?: string;
    category?: string;
}

export interface OMDbResponse {
    Response: string;
    totalResults: string | number;
    Search: OMDbSearchResult[];
}

export interface OMDbSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface RawgIoResponse {
    count: number;
    next: string;
    previous: string;
    results: RawgIoResult[];
}

export interface RawgIoResult {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: object;
    ratings_count: number;
    reviews_text_count: string;
    added: number;
    added_by_status: object;
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    updated: string;
    esrb_rating: {
        id: number;
        slug: string;
        name: string;
    },
    platforms: [
        {
            platform: {
                id: number;
                slug: string;
                name: string;
            },
            released_at: string,
            requirements: {
                minimum: string;
                recommended: string;
            }
        }
    ]
}

export interface JikanResponse { // si se rompe en algun punto hay que agregar la posibilidad de que sean nulleables
    data: JikanAnimeData[] | JikanMangaData[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        items: {
            count: number;
            total: number;
            per_page: number;
        }
    }
}

export interface JikanAnimeData {
    mal_id: number;
    url: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    trailer: {
        youtube_id: string;
        url: string;
        embed_url: string;
    };
    approved: boolean;
    titles: [
        {
            type: string;
            title: string;
        }
    ];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: [
        string
    ];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: {
        from: string;
        to: string;
        prop: {
            from: {
                day: number;
                month: number;
                year: number;
            };
            to: {
                day: number;
                month: number;
                year: number;
            };
            string: string;
        };
    };
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: {
        day: string;
        time: string;
        timezone: string;
        string: string;
    };
    producers: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    licensors: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    studios: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    genres: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    explicit_genres: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    themes: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    demographics: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
}

export interface JikanMangaData {
    mal_id: number;
    url: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    approved: boolean;
    titles: [
        {
            type: string;
            title: string;
        }
    ];
    title: string;
    title_english: string;
    title_japanese: string;
    type: string;
    chapters: number;
    volumes: number;
    status: string;
    publishing: boolean;
    published: {
        from: string;
        to: string;
        prop: {
            from: {
                day: number;
                month: number;
                year: number;
            };
            to: {
                day: number;
                month: number;
                year: number;
            };
            string: string;
        };
    };
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    authors: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    serializations: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    genres: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    explicit_genres: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    themes: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
    demographics: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }
    ];
}

