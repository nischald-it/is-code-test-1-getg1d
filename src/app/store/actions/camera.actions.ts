import { Action } from "@ngrx/store";
import { Camera } from "../../models/camera.model";

export enum CameraActionTypes {
  AllCameraRequested = '[Camera Page] All Cameras Requested',
  AllCamerasLoaded = '[Camera Page] All Cameras Loaded',
  CameraSaved = '[Edit Camera Dialog] Camera Saved'
}

export class AllCameraRequested implements Action {
  readonly type = CameraActionTypes.AllCameraRequested;
}

export class AllCamerasLoaded implements Action {
  readonly type = CameraActionTypes.AllCamerasLoaded;
  constructor(public payload?: { cameras: Camera[] }) {
  }
}

export class CameraSaved implements Action {
  readonly type = CameraActionTypes.CameraSaved;
  constructor(public payload: { camera: Camera }) { }
}

export type CameraActions =
  AllCameraRequested
  | AllCamerasLoaded
  | CameraSaved;
