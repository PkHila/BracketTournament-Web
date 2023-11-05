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