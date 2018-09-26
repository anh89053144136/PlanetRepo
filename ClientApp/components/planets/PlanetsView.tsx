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
		this.model.addListener((e:any) => { this.onModelChange(e) });
		this.controller = new PlanetsController(this.model);

		//this.planetsTable.setState({});
    }
	
	private onModelChange(newState: PlanetsTableState) {
		this.planetsTable.current.setState(newState);
	}
	
	private onTableStateChange(newState: BaseSortingPaging) {
		this.controller.setNewPage(newState);
	} 
	
    public render() {
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
	
	public componentDidMount() {
		this.controller.setNewPage({
			orderBy: "name",
			order: "desc",
			page: 0,
			rowsPerPage: 5
		});
	}
}