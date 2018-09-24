import { PlanetsTableState } from './PlanetsTableState';
import {EventEmitter} from 'fbemitter';

export class PlanetsModel {
	emitter: EventEmitter;
	currentState: PlanetsTableState;
	eventType:string = 'change';
	
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

	public addListener(fn: Function) {
		this.emitter.addListener(this.eventType, fn);
	}
	
	public setPlanets(newState: PlanetsTableState) {
		this.currentState = newState;
		this.emitter.emit(this.eventType, newState);
	}
	
	public getPlanets(): PlanetsTableState { 
		return this.currentState;
	}
}