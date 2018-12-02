import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import { PlanetItemController } from './PlanetItemController';

export class PlanetItemView extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.id = props.match.params.id;
        //this.planetItemController = new PlanetItemController();

		this.state = { 
            id: this.id,
            name: "",
            lastVisitDate: "",
            radius: "",
            savedMessageOpen: false,
            loading: true
        };
    }
	
	handleChangeName(event) {
		// some validation
		this.setState({
			name: event.target.value,
		});
	};
  
	handleChangeLastVisitDate(event) {
		this.setState({
            lastVisitDate: event.target.value + 'T00:00:00.000Z'
        });
	};
	
	handleChangeRadius(event) {
		// some validation
		this.setState({
			radius: (event.target.value)
		});
	};
	
    render() {
        //debugger;
        
        //2004-01-31T21:00:00.000Z"
        var lastVisitDate = this.state.lastVisitDate && this.state.lastVisitDate.length >= 10 ? this.state.lastVisitDate.slice(0, 10) : "00-00-00";
        
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
                    <Button variant="extendedFab" color="primary" disabled={this.state.loading} onClick={(e) => this.handleSaveClick(e)}>
					     <SaveIcon /> Save
				    </Button>
				</Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.savedMessageOpen}
                autoHideDuration={6000}
                onClose={(event, reason) => this.handleClose(event, reason)}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Saved successfully!</span>}
                action={[
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={(event, reason) => this.handleClose(event, reason)}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>;
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ savedMessageOpen: false });
    };

    componentDidMount() {
        //this.planetItemController.initState();
        if (!this.id || this.id == 0) {
            this.setState({ loading: false });
            return;
        }

        var url = "api/Planets/get/" + this.id;

        fetch(url).then(response => response.json())
            .then(data => {
                //data.lastVisitDate = new Date(data.lastVisitDate);
                this.setState(data);
                this.setState({ loading: false });
            });
	}
	
    handleSaveClick(e) {
        var url = "api/Planets/save";

        this.setState({ loading: true });

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        //.then(response => response.json())
        .then(data => {
            //data.lastVisitDate = new Date(data.lastVisitDate);
            this.setState({ loading: false, savedMessageOpen: true });

            this.props.history.push('/planets');
        });
	}
}