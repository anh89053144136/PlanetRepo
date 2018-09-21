import * as React from 'react';
import { NavMenu } from './NavMenu';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StorageIcon from '@material-ui/icons/Storage';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div>
				<AppBar position="static">
					<Toolbar variant="dense">
					  <IconButton color="inherit" aria-label="Menu">
						<StorageIcon />
					  </IconButton>
					  <Typography variant="title" color="inherit">
						Planets
					  </Typography>
					</Toolbar>
				  </AppBar>

			<div>
				<NavMenu />
			</div>
					
			<div>
					{ this.props.children }
			</div>
		</div>;
    }
}
