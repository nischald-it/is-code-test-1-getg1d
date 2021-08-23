import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";
import { DataManagementService } from "../../services/data-management.service";
import { AllAssignmentsLoaded, AssignmentActionTypes } from "../actions/assignment.actions.index";
import { allAssignmentsLoaded } from "../selectors/assignment.selectors";
import { ApplicationState } from "../states/application-state";

@Injectable()
export class AssignmentEffects {
    constructor(private actions$: Actions, private dataManagementService: DataManagementService, private store: Store<ApplicationState>) { 
        
    }

    @Effect()
    loadAssignment$ = this.actions$.
        pipe(
            ofType<AllAssignmentsLoaded>(AssignmentActionTypes.AllAssignmentRequested),
            withLatestFrom(this.store.pipe(select(allAssignmentsLoaded))),
            // filter(([action, allAssignmentsLoaded]) => !allAssignmentsLoaded),
            mergeMap(() => this.dataManagementService.getAssignments()),
            map(assignments => new AllAssignmentsLoaded({ assignments }))
        );
}