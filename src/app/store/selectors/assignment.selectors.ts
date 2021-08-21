import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssignmentsState } from "../states/application-state";

import * as fromAssignment from '../reducers/assignment.reducers';
import { AssignmentListComponent } from "src/app/assignments/assignment-list.component";

export const selectAssignmentState = createFeatureSelector<AssignmentsState>('assignmentsState');
export const getAssignmentsStateInfo = (state: AssignmentsState) => state.entities;
// export const assignmentsSelector = createSelector(getAssignmentsState, getAssignmentsStateInfo);


export const selectAllAssignments = createSelector(
    selectAssignmentState,
    fromAssignment.selectAll
  
  );

  export const selectAllActiveAssignments = createSelector(
    selectAllAssignments,
    assignments => assignments.filter(assignment => assignment.deleted !== true )
  
  );

  export const allAssignmentsLoaded = createSelector(
    selectAssignmentState,
    assignmentState => assignmentState.allAssignmentsLoaded
  );