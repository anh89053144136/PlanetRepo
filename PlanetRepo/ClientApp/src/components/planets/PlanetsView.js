import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import { PlanetsTable } from './PlanetsTable';
import { BaseSortingPaging } from '../../base/BaseSortingPaging';
import { PlanetsModel } from './PlanetsModel';
import { PlanetsController } from './PlanetsController';
import { PlanetsTableState } from './PlanetsTableState';

export class PlanetsView extends React.Component {
    controller = null;
    planetsTable = null;
	
	constructor(props) {
        super(props);
        //this.state = { records: [], loading: true };

		/*
        fetch('api/SampleData/Weatherrecords')
            .then(response => response.json() as Promise<PlanetRow[]>)
            .then(data => {
                this.setState({ records: data, loading: false });
            });
		*/
        this.model = new PlanetsModel();
		this.planetsTable = React.createRef();
		this.model.addListener((e) => { this.onModelChange(e) });
		this.controller = new PlanetsController(this.model);

		//this.planetsTable.setState({});
    }
	
	onModelChange(newState) {
		this.planetsTable.current.setState(newState);
	}
	
    onTableStateChange(newState) {
		this.controller.setNewPage(newState);
	} 
	
    render() {
		//large
        return <div>
			<h1>Planet repository</h1> 
			<p>
				<Button variant="extendedFab" href="#/planetitem/0">
					<AddCircleOutlineIcon/> Add
				</Button>
			</p>
            <PlanetsTable ref={this.planetsTable} onChange={(e) => this.onTableStateChange(e)}></PlanetsTable>
        </div>;
    }
	
	componentDidMount() {
		this.controller.setNewPage({
			orderBy: "name",
			order: "desc",
			page: 0,
			rowsPerPage: 5
		});
	}
}