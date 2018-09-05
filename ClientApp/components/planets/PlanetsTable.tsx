import * as React from 'react';

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

import { BaseTableState } from '../../base/BaseTableState';

interface PlanetsViewState extends BaseTableState<PlanetRow> {
}

export class PlanetsTable extends React.Component<{}, PlanetsViewState> {
	/*
	componentDidMount() {
		this.props.ref(this)
	}
	
	componentWillUnmount() {
		this.props.ref(undefined)
	}
	*/
    constructor(props: any) {
        super(props);

		let newState = { 
			loading: false,
			records: [
				{ name: "Mercury", lastVisitDate: "2004", radius: 2439.7 },
				{ name: "Venus", lastVisitDate: "1970", radius: 6051.8 },
				{ name: "Earth", lastVisitDate: "", radius: 6371.8 },
				{ name: "Mars", lastVisitDate: "1980", radius: 3389.5 },
				{ name: "Saturn", lastVisitDate: "August 11, 2009", radius: 58232 },
				{ name: "Jupiter", lastVisitDate: "15 октября 1997", radius: 69911 },
				{ name: "Uranus", lastVisitDate: "17 января 1986", radius: 25362 },
				{ name: "Neptune", lastVisitDate: "август 1989", radius: 24622 }
			],
			orderBy: "name",
			order: "desc",
			page: 0,
			rowsPerPage: 5
		}
		this.state = newState;
		//this.setState(newState);
    }

    public render() {
        return this.renderPlanetsTable(this.state.records, this.state.order, this.state.orderBy, this.state.rowsPerPage, this.state.page);
    }

	private handleRequestSort(property: any)  
	{
		debugger;
		const orderBy = property;
		let order = 'desc';
		
		if (this.state.orderBy === property && this.state.order === 'desc') {
		  order = 'asc';
		}

		this.setState({ order, orderBy });
	};
  
	private handleChangePage(event: any, page: any) {
		this.setState({ page });
	};

	private handleChangeRowsPerPage(event: any) {
		this.setState({ rowsPerPage: event.target.value });
	};
  
    private renderPlanetsTable(records: PlanetRow[], order: any, orderBy: string, rowsPerPage: number, page: number) {
		return <Table>
				<TableHead>
				  <TableRow>
					<TableCell>
						<TableSortLabel
							active={orderBy === "name"}
							direction={order}
							onClick={(event) => { this.handleRequestSort("name")} }>
							Name
						</TableSortLabel>
					</TableCell>
					<TableCell>
						<TableSortLabel
							active={orderBy === "lastVisitDate"}
							direction={order}
							onClick={(event) => { this.handleRequestSort("lastVisitDate")} }>
							Last visit date
						</TableSortLabel>
					</TableCell>
					<TableCell numeric>
						<TableSortLabel
							active={orderBy === "radius"}
							direction={order}
							onClick={(event) => { this.handleRequestSort("radius")} }>
							Radius
						</TableSortLabel>
					</TableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {records.map(row => {
					return (
					  <TableRow key={row.name}>
						<TableCell component="th" scope="row">
						  {row.name}
						</TableCell>
						<TableCell numeric>{row.lastVisitDate}</TableCell>
						<TableCell numeric>{row.radius}</TableCell>
					  </TableRow>
					);
				  })}
				</TableBody>
				<TableFooter>
				  <TableRow>
					<TablePagination
					  colSpan={3}
					  count={21}
					  rowsPerPage={rowsPerPage}
					  page={page}
					  onChangePage={this.handleChangePage}
					  onChangeRowsPerPage={this.handleChangeRowsPerPage}
					/>
				  </TableRow>
            </TableFooter>
		</Table>;
    }
}

interface PlanetRow {
    name: string;
    lastVisitDate: string;
    radius: number;
}
