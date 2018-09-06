import { BaseSortingPaging } from './BaseSortingPaging';

export interface BaseTableState<T> extends BaseSortingPaging {
    records: Array<T>;
    loading: boolean;
	rowsCount: number;
}