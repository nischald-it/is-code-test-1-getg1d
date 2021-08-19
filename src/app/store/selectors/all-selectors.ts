import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VehiclesState } from "../states/application-state";

export const getVehiclesState = createFeatureSelector<VehiclesState>('vehiclesState');
export const getVehiclesStateInfo = (state: VehiclesState) => state;
export const vehiclesSelector = createSelector(getVehiclesState, getVehiclesStateInfo);