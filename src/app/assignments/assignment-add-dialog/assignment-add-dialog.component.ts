import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { StoreService } from "../../services/store.service";
import { AssignmentInit } from "../../dto/assignmentInit.model";
import { AssignmentResponse } from "../../models/assignment.model";
import { Camera } from "../../models/camera.model";
import { Vehicle } from "../../models/vehicle.model";
import { DataManagementService } from "../../services/data-management.service";


@Component({
    selector: 'assignment-add-dialog',
    templateUrl: './assignment-add-dialog.component.html',
    styleUrls: ['./assignment-add-dialog.component.css']
})
export class AssignmentAddDialogComponent implements OnInit, OnDestroy {
    form: FormGroup;
    description: string = "Assign Camera";
    assignmentInit: AssignmentInit = new AssignmentInit();
    availableVehicles: Vehicle[];
    availableCameras: Camera[];
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private fb: FormBuilder,
        private dataManagementService: DataManagementService,
        private storeService: StoreService,
        private dialogRef: MatDialogRef<AssignmentAddDialogComponent>) {

    }
    ngOnInit(): void {
        this.form = this.fb.group({
            vehicle: [this.assignmentInit.vehicle, Validators.required],
            camera: [this.assignmentInit.camera, Validators.required]
        });

        this.storeService.getAllEntities()
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
            let assignments: AssignmentResponse[] = res[0];
            let vehicles: Vehicle[] = res[1];
            let cameras: Camera[] = res[2];
            
            this.availableVehicles = vehicles.filter(v => !assignments.map(a=> a.vehicleId).includes(v.id))
            this.availableCameras = cameras.filter(c => !assignments.map(a => a.cameraId).includes(c.id));
        }
        )
    }

    close() {
        this.dialogRef.close();
    }

    save(){
        const formValue = this.form.value;
 
        this.dataManagementService.addAssignment(+formValue.camera, +formValue.vehicle)
        .subscribe(
            () => {

                //We have to call dispatch as assignment creation endpoint is not returing Created object
                this.storeService.refreshAssignment()
                this.dialogRef.close();
            });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
      }
}


