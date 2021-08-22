import { Action } from "@ngrx/store";
import { AssignmentResponse } from "../../models/assignment.model";

export enum AssignmentActionTypes {
  AllAssignmentRequested = '[Assignment Page] All Assignments Requested',
  AllAssignmentsLoaded = '[Assignment Page] All Assignments Loaded',
  AssignmentSaved = '[Edit Assignment Dialog] Assignment Saved',
  AssignmentDeleted = '[Edit Assignment Dialog] Assignment Deleted'
}

export class AllAssignmentRequested implements Action {
  readonly type = AssignmentActionTypes.AllAssignmentRequested;
}

export class AllAssignmentsLoaded implements Action {
  readonly type = AssignmentActionTypes.AllAssignmentsLoaded;
  constructor(public payload?: { assignments: AssignmentResponse[] }) {
  }
}

export class AssignmentSaved implements Action {
  readonly type = AssignmentActionTypes.AssignmentSaved;
  constructor(public payload: { assignment: AssignmentResponse }) { }
}

export class AssignmentDeleted implements Action {
  readonly type = AssignmentActionTypes.AssignmentDeleted;
  constructor(public payload: { assignment: AssignmentResponse }) { }
}

export type AssignmentActions =
  AllAssignmentRequested
  | AllAssignmentsLoaded
  | AssignmentSaved
  | AssignmentDeleted;
