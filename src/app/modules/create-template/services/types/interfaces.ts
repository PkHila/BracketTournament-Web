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
    totalResults: string;
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

export interface JikanResponse {
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
    images: {
        jpg: {
            image_url: string;
        };
    };
    title: string;
    aired: {
        prop: {
            from: {
                year: number;
            };
        };
    };
    studios: [
        {
            name: string;
        }
    ];
}

export interface JikanMangaData {
    images: {
        jpg: {
            image_url: string;
        };
    };
    title: string;
    published: {
        prop: {
            from: {
                year: number;
            };
        };
    };
    authors: [
        {
            name: string;
        }
    ];
}

