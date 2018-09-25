import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

export class PlanetItemView extends React.Component<RouteComponentProps<{}>, {}> {
	
	constructor(props: any) {
        super(props);
		debugger;
		//this.planetsTable.setState({});
    }
	
    public render() {
        return <div>
			<h1>Planet item</h1> 
			
			<form noValidate>
				<Paper elevation={1}>
					<List>
						<ListItem>
							<TextField id="planet-name" label="Name" margin="normal" />
						</ListItem>
						<ListItem>
							<TextField id="planet-last-visit" label="Last visit date" type="date" defaultValue="2017-05-24" />
						</ListItem>
						<ListItem>
							<TextField id="planet-radius" label="Number" type="number" margin="normal"/>
						</ListItem>
					 </List>
				</Paper>
			</form>
			<p>
				<Button variant="extendedFab" onClick={(e) => this.handleClick(e)}>
					 <ArrowBackIcon /> Back
				</Button>
				
				<Button variant="extendedFab" color="primary" onClick={(e) => this.handleClick(e)}>
					 <SaveIcon /> Save
				</Button>
			</p>
        </div>;
    }
	
	public componentDidMount() {
	}
	
	handleClick(e: any) {
	}
}