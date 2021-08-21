import { ActionReducerMap } from "@ngrx/store";
import { ApplicationState } from "../states/application-state";
import { assignmentReducer } from "./assignment.reducers";
import { vehicleReducer } from "./vehicle.reducers";
import { cameraReducer } from "./camera.reducers";

export const reducers: ActionReducerMap<ApplicationState> = {
    vehiclesState: vehicleReducer,
    assignmentsState: assignmentReducer,
    camerasState: cameraReducer
};