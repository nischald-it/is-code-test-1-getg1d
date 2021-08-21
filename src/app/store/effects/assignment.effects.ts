import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect} from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { filter, map, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { Assignment, AssignmentResponse } from "src/app/models/assignment.model";
import { DataService } from "src/app/services/data.service";
import { AllAssignmentsLoaded, AssignmentActionTypes } from "../actions/assignment.actions.index";
import { allAssignmentsLoaded } from "../selectors/assignment.selectors";
import { ApplicationState } from "../states/application-state";


@Injectable()
export class AssignmentEffects {
    constructor(private actions$: Actions, private data: DataService, private store: Store<ApplicationState>) {
        
    }

    @Effect()
    loadAssignment$ = this.actions$.
        pipe(
            ofType<AllAssignmentsLoaded>(AssignmentActionTypes.AllAssignmentRequested),
            withLatestFrom(this.store.pipe(select(allAssignmentsLoaded))),
            // filter(([action, allAssignmentsLoaded]) => !allAssignmentsLoaded),
            mergeMap(() => this.data.get<AssignmentResponse[]>("assignments")),
            map(assignments => new AllAssignmentsLoaded({assignments}))
        );
}