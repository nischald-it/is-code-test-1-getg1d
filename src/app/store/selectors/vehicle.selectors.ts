import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VehiclesState } from "../states/application-state";

import * as fromVehicle from '../reducers/vehicle.reducers';

export const selectVehicleState = createFeatureSelector<VehiclesState>('vehiclesState');
export const getVehiclesStateInfo = (state: VehiclesState) => state.entities;
// export const vehiclesSelector = createSelector(getVehiclesState, getVehiclesStateInfo);


export const selectAllVehicles = createSelector(
    selectVehicleState,
    fromVehicle.selectAll
  
  );

  export const allVehiclesLoaded = createSelector(
    selectVehicleState,
    vehicleState => vehicleState.allVehiclesLoaded
  );