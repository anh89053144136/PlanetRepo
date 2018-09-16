import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import Button from '@material-ui/core/Button';

import { PlanetsTable } from './PlanetsTable';
import { BaseSortingPaging } from '../../base/BaseSortingPaging';
import { PlanetsModel } from './PlanetsModel';
import { PlanetsController } from './PlanetsController';
import { PlanetsTableState } from './PlanetsTableState';

export class PlanetsView extends React.Component<RouteComponentProps<{}>, {}> {
	model: PlanetsModel = new PlanetsModel();
	controller: PlanetsController;
    planetsTable:any;
	
	constructor(props: any) {
        super(props);
        //this.state = { records: [], loading: true };

		/*
        fetch('api/SampleData/Weatherrecords')
            .then(response => response.json() as Promise<PlanetRow[]>)
            .then(data => {
                this.setState({ records: data, loading: false });
            });
		*/
		this.planetsTable = React.createRef();
debugger;
		//this.model.addListener(this.onModelChange);
		this.controller = new PlanetsController(this.model);
		
		//this.planetsTable.setState({});
    }
	
	private onModelChange(newState: PlanetsTableState) {
		//this.setState(newState);
		this.planetsTable.current.setState(newState);
	}
	
	private onTableStateChange(newState: BaseSortingPaging) {
	} 
	
    public render() {
		/*
        let contents = this.planetsTable.state.loading
            ? <p><em>Loading...</em></p>
            : this.planetsTable.render();
*/
//ref={ref => (this.planetsTable = ref)}
        return <div>
			<h1>Planet repository</h1> 
			<p>
				<Button variant="outlined" onClick={(e) => this.handleClick(e)}>
					Default
				</Button>
			</p>
            <PlanetsTable ref={this.planetsTable} onChange={this.onTableStateChange}></PlanetsTable>
        </div>;
    }
	
	handleClick(e: any) {
		this.planetsTable.current.setState({
			loading: false,
			records: [
				{ name: "Mercury", lastVisitDate: "2004", radius: 2439.7 },
				{ name: "Venus", lastVisitDate: "1970", radius: 6051.8 },
				{ name: "Earth", lastVisitDate: "", radius: 6371.8 },
				{ name: "Mars", lastVisitDate: "1980", radius: 3389.5 }
			],
			orderBy: "name",
			order: "desc",
			page: 0,
			rowsPerPage: 5,
			rowsCount: 4
		});
		
		this.model.addListener(this.onModelChange);
	}
}