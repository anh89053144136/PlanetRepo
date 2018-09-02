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

interface PlanetsViewState {
    planets: PlanetRow[];
    loading: boolean;
}

export class PlanetsView extends React.Component<RouteComponentProps<{}>, PlanetsViewState> {
	
	private orderBy: string;
	
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
			]
		}
		this.state = newState;
		//this.setState(newState);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : PlanetsView.renderplanetsTable(this.state.planets);

        return <div>
			<h1>Planet repository</h1>
            { contents }
        </div>;
    }

	handleRequestSort = (property: any) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
		  order = 'asc';
		}

		this.setState({ order, orderBy });
	  };
  
    private static renderplanetsTable(planets: PlanetRow[]) {
		return <Table>
				<TableHead>
				  <TableRow>
					<TableCell sortDirection={orderBy === row.id ? order : false}>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={this.handleRequestSort(row.id)}>
							Name
						</TableSortLabel>
					</TableCell>
					<TableCell sortDirection={orderBy === row.id ? order : false}>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={this.createSortHandler(row.id)}>
							Last visit date
						</TableSortLabel>
					</TableCell>
					<TableCell numeric sortDirection={orderBy === row.id ? order : false}>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={this.createSortHandler(row.id)}>
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
			  </Table>;
    }
}

interface PlanetRow {
    name: string;
    lastVisitDate: string;
    radius: number;
}
