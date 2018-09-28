import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StorageIcon from '@material-ui/icons/Storage';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

export class Layout extends Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
                            <StorageIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            Planets
					      </Typography>
                    </Toolbar>
                    <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}>
                            <List>
                                <ListItem button component="a" href="#/home">
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <ListItem button component="a" href="#/counter">
                                    <ListItemText primary="Counter" />
                                </ListItem>
                                <ListItem button component="a" href="#/fetchdata">
                                    <ListItemText primary="Fetch data" />
                                </ListItem>
                                <ListItem button component="a" href="#/planets">
                                    <ListItemText primary="Planet repository" />
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </AppBar>

                <div>
                    {this.props.children}
                </div>
            </div>
        );
  }
}
