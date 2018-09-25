import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { PlanetsView } from './components/planets/PlanetsView';
import { PlanetItemView } from './components/planets/PlanetItemView';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
	<Route path='/fetchdata' component={ FetchData } />
	<Route path='/planets' component={ PlanetsView } />
	<Route path='/planetitem/:id' component={ PlanetItemView } />
</Layout>;
