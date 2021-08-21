import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Camera } from "src/app/models/camera.model";
import { Assignment, AssignmentResponse } from "../../models/assignment.model";
import { Vehicle } from "../../models/vehicle.model";

export interface ApplicationState {
    vehiclesState: VehiclesState;
    assignmentsState: AssignmentsState;
    camerasState: CamerasState;
}

export interface VehiclesState extends EntityState<Vehicle>{
    allVehiclesLoaded:boolean;
}
export const vehicleAdapter : EntityAdapter<Vehicle> =   createEntityAdapter<Vehicle>();

export const initialVehiclesState: VehiclesState = vehicleAdapter.getInitialState({
    allVehiclesLoaded: false
  });



export interface AssignmentsState extends EntityState<AssignmentResponse>{
    allAssignmentsLoaded:boolean;
}
export const assignmentAdapter : EntityAdapter<AssignmentResponse> =   createEntityAdapter<AssignmentResponse>();

export const initialAssignmentsState: AssignmentsState = assignmentAdapter.getInitialState({
    allAssignmentsLoaded: false
  });


export interface CamerasState extends EntityState<Camera>{
    allCamerasLoaded:boolean;
}
export const cameraAdapter : EntityAdapter<Camera> =   createEntityAdapter<Camera>();

export const initialCamerasState: CamerasState = cameraAdapter.getInitialState({
    allCamerasLoaded: false
  });

  