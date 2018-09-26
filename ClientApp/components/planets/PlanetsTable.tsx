import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import { PlanetsTableState } from './PlanetsTableState';
import { PlanetRow } from './PlanetRow';
import { BaseTableProps } from '../../base/BaseTableProps';
import { BaseSortingPaging } from '../../base/BaseSortingPaging';

const loading_container = {
	textAlign: "center"
} as React.CSSProperties;

export class PlanetsTable extends React.Component<BaseTableProps, PlanetsTableState> {
	private onChange: (newState: BaseSortingPaging) => void;
	
    constructor(props: any) {
        super(props);
		
		this.onChange = props.onChange;
		this.state = {
			loading: true,
			records: [],
			orderBy: "name",
			order: "desc",
			page: 0,
			rowsPerPage: 5,
			rowsCount: 0
		};
    }

    public render() {
		let tableBody = (this.state == null || this.state.records.length ==0 || this.state.loading == true) ? 
			<TableBody>
				<TableRow>
					<TableCell colSpan={4}>
						<div style={loading_container}>
							<CircularProgress />
						</div>
					</TableCell>
				</TableRow>
			</TableBody>:
			<TableBody>
				  {this.state.records.map(row => {
					var lastVisitDate = row.lastVisitDate?row.lastVisitDate.toISOString().slice(0,10):"";
					
					return (
					  <TableRow key={row.name}>
						<TableCell component="th" scope="row">
						  {row.name}
						</TableCell>
						<TableCell>{lastVisitDate}</TableCell>
						<TableCell numeric>{row.radius}</TableCell>
						<TableCell numeric>
							<Grid container spacing={8}>
								<Grid item>
									<Button variant="fab" href={"#/planetitem/" + row.id}>
										<EditIcon />
									</Button>
								</Grid>
								<Grid item>
									<Button variant="fab">
										<DeleteForeverIcon />
									</Button>
								</Grid>
							</Grid>
						</TableCell>
					  </TableRow>
					);
				  })}
				</TableBody>;
		
		let direction:any = this.state.order;
		
		let result = <Table>
				<TableHead>
				  <TableRow>
					<TableCell>
						<TableSortLabel
							active={this.state.orderBy === "name"}
							direction={direction}
							onClick={(event) => { this.handleRequestSort("name")} }>
							Name
						</TableSortLabel>
					</TableCell>
					<TableCell>
						<TableSortLabel
							active={this.state.orderBy === "lastVisitDate"}
							direction={direction}
							onClick={(event) => { this.handleRequestSort("lastVisitDate")} }>
							Last visit date
						</TableSortLabel>
					</TableCell>
					<TableCell numeric>
						<TableSortLabel
							active={this.state.orderBy === "radius"}
							direction={direction}
							onClick={(event) => { this.handleRequestSort("radius")} }>
							Radius
						</TableSortLabel>
					</TableCell>
					<TableCell></TableCell>
				  </TableRow>
				</TableHead>
					{ tableBody }
				<TableFooter>
				  <TableRow>
					<TablePagination
					  colSpan={4}
					  count={this.state.rowsCount}
					  rowsPerPage={this.state.rowsPerPage}
					  page={this.state.page}
					  onChangePage={(event, page) => {this.handleChangePage(event, page)}}
					  onChangeRowsPerPage={(event) => { this.handleChangeRowsPerPage(event)}}
					/>
				  </TableRow>
            </TableFooter>
		</Table>;
		
        return result;
    }

	private handleRequestSort(property: any)  
	{
		const orderBy = property;
		let order = 'desc';
		
		if (this.state.orderBy === property && this.state.order === 'desc') {
		  order = 'asc';
		}
		
		if(!this.onChange) return;
		
		this.setState({loading: true});
		
		this.onChange({
			order: order,
			orderBy: orderBy,
			page: this.state.page,
			rowsPerPage: this.state.rowsPerPage
		});
	};
  
	private handleChangePage(event: any, page: any) {
		if(!this.onChange) return;
		
		this.setState({loading: true});
		
		this.onChange({
			order: this.state.order,
			orderBy: this.state.orderBy,
			page: page,
			rowsPerPage: this.state.rowsPerPage
		});
	};

	private handleChangeRowsPerPage(event: any) {
		if(!this.onChange) return;
		
		this.setState({loading: true});
		
		this.onChange({
			order: this.state.order,
			orderBy: this.state.orderBy,
			page: this.state.page,
			rowsPerPage: event.target.value
		});
	};
}