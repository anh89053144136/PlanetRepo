import { BaseTableState } from '../../base/BaseTableState';
import { BaseSortingPaging } from '../../base/BaseSortingPaging';

import { PlanetRow } from './PlanetRow';
import { PlanetsModel } from './PlanetsModel';
import { PlanetsTableState } from './PlanetsTableState';

import React from 'react';

export class PlanetItemController {

    constructor(model) {
        this.model = model;
	}
	
    initState(id) {
        var url = "api/Planets/get/" + id;

        fetch(url).then(response => response.json())
            .then(data => {
                debugger;
            });
	}
}