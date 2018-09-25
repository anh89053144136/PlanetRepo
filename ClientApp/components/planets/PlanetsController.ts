import { BaseTableState } from '../../base/BaseTableState';
import { BaseSortingPaging } from '../../base/BaseSortingPaging';

import { PlanetRow } from './PlanetRow';
import { PlanetsModel } from './PlanetsModel';
import { PlanetsTableState } from './PlanetsTableState';

export class PlanetsController {
	allPlanets:Array<PlanetRow> = [
				{ id: 1, name: "Mercury", lastVisitDate: "2004", radius: 2439.7 },
				{ id: 2, name: "Venus", lastVisitDate: "1970", radius: 6051.8 },
				{ id: 3, name: "Earth", lastVisitDate: "", radius: 6371.8 },
				{ id: 4, name: "Mars", lastVisitDate: "1980", radius: 3389.5 },
				{ id: 5, name: "Saturn", lastVisitDate: "August 11, 2009", radius: 58232 },
				{ id: 6, name: "Jupiter", lastVisitDate: "15 октября 1997", radius: 69911 },
				{ id: 7, name: "Uranus", lastVisitDate: "17 января 1986", radius: 0 },
				{ id: 8, name: "Neptune", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 9, name: "PSR 1257+12", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 10, name: "GJ 1214 b", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 11, name: "Kepler-10 b", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 12, name: "Gliese 667 Cc", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 13, name: "Gliese 581 d", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 14, name: "Gliese 581 g", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 15, name: "Kepler-20 e", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 16, name: "HD 85512 b", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 17, name: "Kepler-22 b", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 18, name: "GD 66 b", lastVisitDate: "август 1989", radius: 24622 },
				{ id: 19, name: "HD 188753 Ab", lastVisitDate: "август 1989", radius: 24622 }
			];
			
	constructor(private model: PlanetsModel) {
	}
	
	setNewPage(newState: BaseSortingPaging) {
		let newPage: PlanetsTableState =
		{
			loading: false,
			records: this.allPlanets.slice(newState.page*newState.rowsPerPage, newState.page*newState.rowsPerPage + newState.rowsPerPage),
			orderBy: newState.orderBy,
			order: newState.order,
			page: newState.page,
			rowsPerPage: newState.rowsPerPage,
			rowsCount: this.allPlanets.length
		};
		
		this.model.setPlanets(newPage);
	}
}