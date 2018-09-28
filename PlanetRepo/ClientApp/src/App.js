import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { PlanetsView } from './components/planets/PlanetsView';
import { PlanetItemView } from './components/planets/PlanetItemView';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <Layout>
            <Route exact path='/' component={PlanetsView} />
            <Route exact path='/planets' component={PlanetsView} />
            <Route path='/planetitem/:id' component={PlanetItemView} />
            <Route  path='/home' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />
      </Layout>
    );
  }
}
