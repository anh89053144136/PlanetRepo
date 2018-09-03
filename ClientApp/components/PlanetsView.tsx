import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

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

interface PlanetsViewState {
    planets: PlanetRow[];
    loading: boolean;
	order: string; 
	orderBy: string;
}

export class PlanetsView extends React.Component<RouteComponentProps<{}>, PlanetsViewState> {
	
    constructor(props: any) {
        super(props);
        //this.state = { planets: [], loading: true };

		/*
        fetch('api/SampleData/Weatherplanets')
            .then(response => response.json() as Promise<PlanetRow[]>)
            .then(data => {
                this.setState({ planets: data, loading: false });
            });
		*/
		let newState = { 
			loading: false,
			planets: [
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
			order: "desc"
		}
		this.state = newState;
		//this.setState(newState);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderplanetsTable(this.state.planets, this.state.order, this.state.orderBy);

        return <div>
			<h1>Planet repository</h1>
            { contents }
        </div>;
    }

	private handleRequestSort(property: any)  {
		const orderBy = property;
		let order = 'desc';
		
		if (this.state.orderBy === property && this.state.order === 'desc') {
		  order = 'asc';
		}

		this.setState({ order, orderBy });
	};
  
    private renderplanetsTable(planets: PlanetRow[], order: any, orderBy: string) {
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
				  {planets.map(row => {
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
					  count={rows.length}
					  rowsPerPage={rowsPerPage}
					  page={page}
					  onChangePage={this.handleChangePage}
					  onChangeRowsPerPage={this.handleChangeRowsPerPage}
					  ActionsComponent={TablePaginationActionsWrapped}
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
