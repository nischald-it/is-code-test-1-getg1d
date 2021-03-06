import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssignmentsState } from "../states/application-state";
import * as fromAssignment from '../reducers/assignment.reducers';

export const selectAssignmentState = createFeatureSelector<AssignmentsState>('assignmentsState');

export const selectAllAssignments = createSelector(
  selectAssignmentState,
  fromAssignment.selectAll
);

export const selectAllActiveAssignments = createSelector(
  selectAllAssignments,
  assignments => assignments.filter(assignment => assignment.deleted !== true)
);

export const allAssignmentsLoaded = createSelector(
  selectAssignmentState,
  assignmentState => assignmentState.allAssignmentsLoaded
);