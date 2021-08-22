import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CamerasState } from "../states/application-state";
import * as fromCamera from '../reducers/camera.reducers';

export const selectCameraState = createFeatureSelector<CamerasState>('camerasState');
// export const getCamerasStateInfo = (state: CamerasState) => state.entities;

export const selectAllCameras = createSelector(
  selectCameraState,
  fromCamera.selectAll
);

export const allCamerasLoaded = createSelector(
  selectCameraState,
  cameraState => cameraState.allCamerasLoaded
);