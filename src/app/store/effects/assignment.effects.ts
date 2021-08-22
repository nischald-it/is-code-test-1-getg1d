import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";
import { AssignmentResponse } from "../../models/assignment.model";
import { DataService } from "../../services/data.service";
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
            map(assignments => new AllAssignmentsLoaded({ assignments }))
        );
}