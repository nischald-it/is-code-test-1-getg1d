import { Update } from "@ngrx/entity";
import { Action, createAction, props } from "@ngrx/store";
import { Vehicle } from "../../models/vehicle.model";



export enum VehicleActionTypes {
    AllVehicleRequested = '[Vehicle Page] All Vehicles Requested',
    AllVehiclesLoaded = '[Vehicle Page] All Vehicles Loaded',
    VehicleSaved = '[Edit Vehicle Dialog] Vehicle Saved'
  }
 
  
 export class AllVehicleRequested implements Action {

    readonly type = VehicleActionTypes.AllVehicleRequested;

  
  } 
  

export class AllVehiclesLoaded implements Action {
    readonly type = VehicleActionTypes.AllVehiclesLoaded;

    constructor(public payload?:{vehicles: Vehicle[]}) {
        
    }
}

export class VehicleSaved implements Action {

    readonly type = VehicleActionTypes.VehicleSaved;
  
    // constructor(public payload: { vehicle: Update<Vehicle> }) {}
    constructor(public payload: { vehicle: Vehicle }) {}
  }
  

export type VehicleActions =
AllVehicleRequested
| AllVehiclesLoaded
| VehicleSaved;
