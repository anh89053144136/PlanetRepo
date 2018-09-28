import { BaseSortingPaging } from './BaseSortingPaging';

export class BaseTableState extends BaseSortingPaging {
    records = null;
    loading = null;
    rowsCount = null;
}