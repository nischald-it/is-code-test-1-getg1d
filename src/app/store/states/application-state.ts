import { Vehicle } from "src/app/models/vehicle.model";

export interface ApplicationState {
    vehiclesState: VehiclesState;
}

export interface VehiclesState {
    vehicles: Vehicle[];
}

export const initialVehiclesState: VehiclesState = {vehicles: <Vehicle[]>[]}