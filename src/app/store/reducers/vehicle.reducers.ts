import { VehicleActions,  VehicleActionTypes } from "../actions/vehicle.actions";
import { vehicleAdapter, initialVehiclesState, VehiclesState } from "../states/application-state";

export function vehicleReducer(state: VehiclesState= initialVehiclesState, action: VehicleActions) : VehiclesState{
    switch(action.type) {
        case VehicleActionTypes.AllVehiclesLoaded:
            return vehicleAdapter.setAll(action.payload.vehicles, {...state, allVehiclesLoaded: true})
        case VehicleActionTypes.VehicleSaved:
            return vehicleAdapter.upsertOne(action.payload.vehicle, state);
            // return adapter.updateOne(action.payload.vehicle, state)
       
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
  
  } = vehicleAdapter.getSelectors();