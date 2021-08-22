import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { Camera } from "../../models/camera.model";
import { DataService } from "../../services/data.service";
import { AllCamerasLoaded, CameraActionTypes } from "../actions/camera.actions.index";
import { allCamerasLoaded } from "../selectors/camera.selectors";
import { ApplicationState } from "../states/application-state";

@Injectable()
export class CameraEffects {
    constructor(private actions$: Actions, private data: DataService, private store: Store<ApplicationState>) {

    }

    @Effect()
    loadCamera$ = this.actions$.
        pipe(
            ofType<AllCamerasLoaded>(CameraActionTypes.AllCameraRequested),
            withLatestFrom(this.store.pipe(select(allCamerasLoaded))),
            filter(([action, allCamerasLoaded]) => !allCamerasLoaded),
            mergeMap(() => this.data.get<Camera[]>("cameras")),
            map(cameras => new AllCamerasLoaded({ cameras }))
        );
}