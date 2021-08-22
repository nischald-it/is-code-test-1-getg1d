import { CameraActions, CameraActionTypes } from "../actions/camera.actions";
import { cameraAdapter, initialCamerasState, CamerasState } from "../states/application-state";

export function cameraReducer(state: CamerasState = initialCamerasState, action: CameraActions): CamerasState {
    switch (action.type) {
        case CameraActionTypes.AllCamerasLoaded:
            return cameraAdapter.setAll(action.payload.cameras, { ...state, allCamerasLoaded: true })
        case CameraActionTypes.CameraSaved:
            return cameraAdapter.upsertOne(action.payload.camera, state);
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = cameraAdapter.getSelectors();