import { AssignmentActions, AssignmentActionTypes } from "../actions/assignment.actions";
import { assignmentAdapter, AssignmentsState, initialAssignmentsState } from "../states/application-state";


export function assignmentReducer(state: AssignmentsState = initialAssignmentsState, action: AssignmentActions): AssignmentsState {
    switch (action.type) {
        case AssignmentActionTypes.AllAssignmentsLoaded:
            return assignmentAdapter.setAll(action.payload.assignments, { ...state, allAssignmentsLoaded: true })
        case AssignmentActionTypes.AssignmentSaved:
            return assignmentAdapter.upsertOne(action.payload.assignment, state);
        case AssignmentActionTypes.AssignmentDeleted:
            return assignmentAdapter.upsertOne(action.payload.assignment, state);

        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = assignmentAdapter.getSelectors();