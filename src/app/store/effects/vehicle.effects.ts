import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { Vehicle } from "../../models/vehicle.model";
import { DataService } from "../../services/data.service";
import { AllVehiclesLoaded, VehicleActionTypes } from "../actions/vehicle.actions.index";
import { allVehiclesLoaded } from "../selectors/vehicle.selectors";
import { ApplicationState } from "../states/application-state";

@Injectable()
export class VehicleEffects {
    constructor(private actions$: Actions, private data: DataService, private store: Store<ApplicationState>) {

    }

    @Effect()
    loadVehicle$ = this.actions$.
        pipe(
            ofType<AllVehiclesLoaded>(VehicleActionTypes.AllVehicleRequested),
            withLatestFrom(this.store.pipe(select(allVehiclesLoaded))),
            filter(([action, allVehiclesLoaded]) => !allVehiclesLoaded),
            mergeMap(() => this.data.get<Vehicle[]>("vehicles")),
            map(vehicles => new AllVehiclesLoaded({ vehicles }))
        );
}