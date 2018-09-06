import { BaseTableState } from './BaseTableState';
import { BaseSortingPaging } from './BaseSortingPaging';

export interface BaseTableProps {
	onChange: (newState: BaseSortingPaging) => void;
}