import { ActionReducerMap } from "@ngrx/store";
import { ApplicationState } from "../states/application-state";
import { vehicleReducer } from "./vehicle-reducer";

export const reducers: ActionReducerMap<ApplicationState> = {
    vehiclesState: vehicleReducer

};