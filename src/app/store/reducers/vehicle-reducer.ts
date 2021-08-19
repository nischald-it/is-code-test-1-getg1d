import { LOAD_VEHICLES } from "../actions/load-vehicle-action";
import { initialVehiclesState, VehiclesState } from "../states/application-state";

export function vehicleReducer(state: VehiclesState= initialVehiclesState, action: any) {
    switch(action.type) {
        case LOAD_VEHICLES:
            return {
                vehicles: action.payload
            }
       
        default:
            return state;
    }
}