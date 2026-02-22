export interface PaginationLinks {
    first: string;
    last: string;
    next?: string;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    links: PaginationLinks;
}

export interface PaginatedResponse<T> {
    meta: PaginationMeta;
    data: T[];
}
