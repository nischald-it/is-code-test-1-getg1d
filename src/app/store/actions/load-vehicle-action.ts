import { Action } from "@ngrx/store";
import { Vehicle } from "src/app/models/vehicle.model";

export const LOAD_VEHICLES = 'LOAD_VEHICLE';

export class LoadVehiclesAction implements Action {
    readonly type = LOAD_VEHICLES;

    constructor(public payload?:Vehicle[]) {
        
    }
}