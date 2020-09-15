export class PagedList {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
}

export class PagedListResult<T>{
    result: T;
    PagedList: PagedList;
}
