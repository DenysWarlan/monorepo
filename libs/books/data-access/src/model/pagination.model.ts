export interface Pagination {
    readonly startIndex?: number;
    readonly maxResults?: number;
    readonly pageIndex?: number;
    readonly query?: string;
}