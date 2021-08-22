import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { DataService } from "../services/data.service";
import { AssignmentDeleted } from "../store/actions/assignment.actions";
import { assignmentReducer } from "../store/reducers/assignment.reducers";
import { ApplicationState } from "../store/states/application-state";
import { AssignmentDetail } from "../dto/assignmentDisplay.model";
import { AssignmentResponse } from "../models/assignment.model";
import { Subject } from "rxjs";

@Component({
    selector: 'assignment-delete-dialog',
    templateUrl: './assignment-delete-dialog.component.html',
    styleUrls: ['./assignment-delete-dialog.component.css']
})
export class AssignmentDeleteDialogComponent implements OnInit {
    description: string = 'Unassign Camera';
    deviveNo: string = 'Temp Devive No';
    vehicleName: string = 'Temp Vehicle Name';
    // form: FormGroup;
    currentAssignmentDetail: AssignmentDetail;

    constructor(
        // private fb: FormBuilder,
        private data: DataService,
        private store: Store<ApplicationState> ,
        private dialogRef: MatDialogRef<AssignmentDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) assignementDetail:AssignmentDetail
    ){
        this.deviveNo = assignementDetail.deviceNo;
        this.vehicleName = assignementDetail.vehicleName
        this.currentAssignmentDetail = {...assignementDetail};

        // this.form = fb.group({
        //     // description: [course.description, Validators.required],
        //     // category: [course.category, Validators.required],
        //     // longDescription: [course.longDescription,Validators.required],
        //     // promo: [course.promo, []]
        // });
    }

    ngOnInit() {
        
    }

    onDelet() {
        this.deleteAssignment(this.currentAssignmentDetail.id);
    }

    onCancel() {
        this.dialogRef.close();
    }

    deleteAssignment(id: number) {
        this.data.post("delete-assignment/:id", { id })
        .subscribe(
            () => {
                let assignmentResponse = new AssignmentResponse();
                assignmentResponse = {...this.currentAssignmentDetail};
                assignmentResponse.deleted = true;
                this.store.dispatch(new AssignmentDeleted({assignment: assignmentResponse}))

                this.dialogRef.close();
            });
      }
}