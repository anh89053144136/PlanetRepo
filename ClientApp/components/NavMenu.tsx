import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
				<ul className='nav navbar-nav'>
					<li>
						<NavLink to={ '/' } exact activeClassName='active'>
							<span className='glyphicon glyphicon-home'></span> Home
						</NavLink>
					</li>
					<li>
						<NavLink to={ '/counter' } activeClassName='active'>
							<span className='glyphicon glyphicon-education'></span> Counter
						</NavLink>
					</li>
					<li>
						<NavLink to={ '/fetchdata' } activeClassName='active'>
							<span className='glyphicon glyphicon-th-list'></span> Fetch data
						</NavLink>
					</li>
					<li>
						<NavLink to={ '/planetsview' } activeClassName='active'>
							<span className='glyphicon glyphicon-th-list'></span> Planet repository
						</NavLink>
					</li>
				</ul>
			</div>;
    }
}
