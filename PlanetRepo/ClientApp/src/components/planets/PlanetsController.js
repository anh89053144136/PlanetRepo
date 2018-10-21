import { BaseTableState } from '../../base/BaseTableState';
import { BaseSortingPaging } from '../../base/BaseSortingPaging';

import { PlanetRow } from './PlanetRow';
import { PlanetsModel } from './PlanetsModel';
import { PlanetsTableState } from './PlanetsTableState';

import React from 'react';
		
export class PlanetsController {

    constructor(model) {
        this.model = model;
	}
	
    setNewPage(newState) {
        var url = "api/Planets/List?" +
            "orderBy=" + encodeURIComponent(newState.orderBy) +
            "&order=" + encodeURIComponent(newState.order) +
            "&page=" + encodeURIComponent(newState.page) +
            "&rowsPerPage=" + encodeURIComponent(newState.rowsPerPage);

        fetch(url).then(response => response.json())
            .then(data => {
                let newPage =
                {
                    loading: false,
                    records: data.records,
                    orderBy: newState.orderBy,
                    order: newState.order,
                    page: newState.page,
                    rowsPerPage: newState.rowsPerPage,
                    rowsCount: data.recordCount
                };

                this.model.setPlanets(newPage);
            });
	}
}