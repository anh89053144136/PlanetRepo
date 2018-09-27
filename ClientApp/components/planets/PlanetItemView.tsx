import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

import { PlanetRow } from './PlanetRow';

export class PlanetItemView extends React.Component<RouteComponentProps<{}>, PlanetRow> {
	
	constructor(props: any) {
        super(props);
		
		this.state = { 
			id: 1, 
			name: "Mercury", 
			lastVisitDate: new Date(2004, 1, 1), 
			radius: 2439.7 
		};
    }
	
	handleChangeName(event: any) {
		// some validation
		this.setState({
			name: event.target.value
		});
	};
  
	handleChangeLastVisitDate(event: any) {
		// some validation
		var date = new Date(Date.parse(event.target.value));
		
		this.setState({
			lastVisitDate: date
		});
	};
	
	handleChangeRadius(event: any) {
		// some validation
		this.setState({
			radius: (event.target.value as number)
		});
	};
	
    public render() {
		var lastVisitDate = this.state.lastVisitDate?this.state.lastVisitDate.toISOString().slice(0,10):"";
		
        return <div>
			<h1>Planet item</h1> 
			
			<form noValidate>
				<Paper elevation={1}>
					<List>
						<ListItem>
							<TextField id="planet-name" label="Name" margin="normal" 
								value={this.state.name} 
								onChange={(e) => this.handleChangeName(e)} />
						</ListItem>
						<ListItem>
							<TextField id="planet-last-visit" label="Last visit date" margin="normal" type="date" 
								value={lastVisitDate} 
								onChange={(e) => this.handleChangeLastVisitDate(e)} />
						</ListItem>
						<ListItem>
							<TextField id="planet-radius" label="Radius" type="number" margin="normal" 
								value={this.state.radius}
								onChange={(e) => this.handleChangeRadius(e)} />
						</ListItem>
					 </List>
				</Paper>
			</form>
			
			<p></p>
			
			<Grid container spacing={8}>
				<Grid item>
					<Button variant="extendedFab" href="#/planets">
						 <ArrowBackIcon /> Back
					</Button>
				</Grid>
				<Grid item>
				<Button variant="extendedFab" color="primary" onClick={(e) => this.handleClick(e)}>
					 <SaveIcon /> Save
				</Button>
				</Grid>
			</Grid>
        </div>;
    }
	
	public componentDidMount() {
		//this
	}
	
	handleClick(e: any) {
	}
}