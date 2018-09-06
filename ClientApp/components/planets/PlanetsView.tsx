import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import Button from '@material-ui/core/Button';

import { PlanetsTable } from './PlanetsTable';
import { BaseSortingPaging } from '../../base/BaseSortingPaging';

export class PlanetsView extends React.Component<RouteComponentProps<{}>, {}> {
	private planetsTable: React.RefObject<PlanetsTable>;
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
		let newState = {};
		this.state = newState;
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
		let p = this.planetsTable;
		debugger;
	}
}