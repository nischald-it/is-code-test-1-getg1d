import { AssignmentRequest, AssignmentResponse } from "../models/assignment.model";

export class AssignmentDetail extends AssignmentResponse {
  vehicleName: string;
  deviceNo: string;
}