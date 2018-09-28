import { PlanetsTableState } from './PlanetsTableState';
import {EventEmitter} from 'fbemitter';

export class PlanetsModel {
	emitter = null;
    currentState = null;
	eventType = 'change';
	
	constructor() {
		this.emitter = new EventEmitter();
		this.currentState = { 
			records:[],
			loading: false,
			rowsCount: 0,
			order: "",
			orderBy: "",
			page: 0,
			rowsPerPage:0
		};
	}

	addListener(fn) {
		this.emitter.addListener(this.eventType, fn);
	}
	
	setPlanets(newState) {
		this.currentState = newState;
		this.emitter.emit(this.eventType, newState);
	}
	
	getPlanets() { 
		return this.currentState;
	}
}