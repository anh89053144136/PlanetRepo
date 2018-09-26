import { BaseTableState } from '../../base/BaseTableState';
import { BaseSortingPaging } from '../../base/BaseSortingPaging';

import { PlanetRow } from './PlanetRow';
import { PlanetsModel } from './PlanetsModel';
import { PlanetsTableState } from './PlanetsTableState';

var allPlanets:Array<PlanetRow> = [
	{ id: 1, name: "Mercury", lastVisitDate: new Date(2004, 0, 1), radius: 2439.7 },
	{ id: 2, name: "Venus", lastVisitDate: new Date(1970, 0, 1), radius: 6051.8 },
	{ id: 3, name: "Earth", lastVisitDate: null, radius: 6371.8 },
	{ id: 4, name: "Mars", lastVisitDate: new Date(1980, 0, 1), radius: 3389.5 },
	{ id: 5, name: "Saturn", lastVisitDate: new Date(2009, 7, 11), radius: 58232 },
	{ id: 6, name: "Jupiter", lastVisitDate: new Date(1997, 9, 15), radius: 69911 },
	{ id: 7, name: "Uranus", lastVisitDate: new Date(1986, 0, 17), radius: 0 },
	{ id: 8, name: "Neptune", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 9, name: "PSR 1257+12", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 10, name: "GJ 1214 b", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 11, name: "Kepler-10 b", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 12, name: "Gliese 667 Cc", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 13, name: "Gliese 581 d", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 14, name: "Gliese 581 g", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 15, name: "Kepler-20 e", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 16, name: "HD 85512 b", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 17, name: "Kepler-22 b", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 18, name: "GD 66 b", lastVisitDate: new Date(1989, 7, 1), radius: 24622 },
	{ id: 19, name: "HD 188753 Ab", lastVisitDate: new Date(1989, 7, 1), radius: 24622 }
];
			
export class PlanetsController {

	constructor(private model: PlanetsModel) {
	}
	
	setNewPage(newState: BaseSortingPaging) {
		let newPage: PlanetsTableState =
		{
			loading: false,
			records: allPlanets.slice(newState.page*newState.rowsPerPage, newState.page*newState.rowsPerPage + newState.rowsPerPage),
			orderBy: newState.orderBy,
			order: newState.order,
			page: newState.page,
			rowsPerPage: newState.rowsPerPage,
			rowsCount: allPlanets.length
		};
		
		this.model.setPlanets(newPage);
	}
}