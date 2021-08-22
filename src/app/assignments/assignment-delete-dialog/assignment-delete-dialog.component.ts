import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AssignmentDetail } from "../../dto/assignmentDisplay.model";
import { AssignmentResponse } from "../../models/assignment.model";
import { StoreService } from "../../services/store.service";
import { DataManagementService } from "../../services/data-management.service";

@Component({
    selector: 'assignment-delete-dialog',
    templateUrl: './assignment-delete-dialog.component.html',
    styleUrls: ['./assignment-delete-dialog.component.css']
})
export class AssignmentDeleteDialogComponent {
    description: string = 'Unassign Camera';
    deviveNo: string = 'Temp Devive No';
    vehicleName: string = 'Temp Vehicle Name';
    currentAssignmentDetail: AssignmentDetail;

    constructor(
        private dataManagementService: DataManagementService,
        private stroreService: StoreService,
        private dialogRef: MatDialogRef<AssignmentDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) assignementDetail: AssignmentDetail
    ) {
        this.deviveNo = assignementDetail.deviceNo;
        this.vehicleName = assignementDetail.vehicleName
        this.currentAssignmentDetail = { ...assignementDetail };
    }

    onDelet() {
        this.deleteAssignment(this.currentAssignmentDetail.id);
    }

    onCancel() {
        this.dialogRef.close();
    }

    deleteAssignment(id: number) {
        this.dataManagementService.deleteAssignment(id)
            .subscribe(
                () => {
                    let assignmentResponse = new AssignmentResponse();
                    assignmentResponse = { ...this.currentAssignmentDetail };
                    assignmentResponse.deleted = true;
                    this.stroreService.deleteAssignenment(assignmentResponse);
                    this.dialogRef.close();
                });
    }
}