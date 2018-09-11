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
	//planetsTable: PlanetsTable;
	model: PlanetsModel;
	controller: PlanetsController;
    
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
		//this.planetsTable = new PlanetsTable({onChange: this.onTableStateChange});
		
		this.model = new PlanetsModel();
		this.controller = new PlanetsController(this.model);
		
		this.model.addListener(this.onTableStateChange);
    }
	
	private onModelChange(newState: PlanetsTableState) {
		debugger;
	}
	
	private onTableStateChange(newState: BaseSortingPaging) {
		debugger;
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
            <PlanetsTable onChange={this.onTableStateChange}></PlanetsTable>
        </div>;
    }
	
	handleClick(e: any) {
		//let p = this.planetsTable;
		debugger;
	}
}