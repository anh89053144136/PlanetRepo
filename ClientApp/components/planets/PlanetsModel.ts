import { PlanetsTableState } from './PlanetsTableState';
import {EventEmitter} from 'fbemitter';

export class PlanetsModel {
	emitter: EventEmitter;
	currentState: PlanetsTableState;
	eventType:string = 'change';
	
	constructor() {
		this.emitter = new EventEmitter();
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