export interface BaseTableState<T> {
    records: Array<T>;
    loading: boolean;
	order: string; 
	orderBy: string;
	page: number;
    rowsPerPage: number;
}