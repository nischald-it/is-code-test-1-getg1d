import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { AssignmentResponse } from "../models/assignment.model";
import { Camera } from "../models/camera.model";
import { Vehicle } from "../models/vehicle.model";
import { DataService } from "../services/data.service";
import { AllAssignmentRequested, AssignmentSaved } from "../store/actions/assignment.actions.index";
import { selectAllActiveAssignments } from "../store/selectors/assignment.selectors";
import { selectAllCameras } from "../store/selectors/camera.selectors";
import { selectAllVehicles } from "../store/selectors/vehicle.selectors";
import { ApplicationState } from "../store/states/application-state";

@Component({
    selector: 'assignment-add-dialog',
    templateUrl: './assignment-add-dialog.component.html',
    styleUrls: ['./assignment-add-dialog.component.css']
})
export class AssignmentAddDialogComponent implements OnInit, OnDestroy {
    form: FormGroup;
    description: string = "Assign Camera";
    assignmentInit: AssignmentInit = new AssignmentInit();
    vehicles$: Observable<Vehicle[]>;
    cameras$: Observable<Camera[]>;
    assignments$: Observable<AssignmentResponse[]>;
    availableVehicles: Vehicle[];
    availableCameras: Camera[];
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private fb: FormBuilder,
        private data: DataService,
        private store: Store<ApplicationState> ,
        private dialogRef: MatDialogRef<AssignmentAddDialogComponent>) {

    }
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
        this.form = this.fb.group({
            vehicle: [this.assignmentInit.vehicle, Validators.required],
            camera: [this.assignmentInit.camera, Validators.required]
        });

        this.vehicles$ = this.store.pipe(select(selectAllVehicles));
        this.cameras$ = this.store.pipe(select(selectAllCameras));
        this.assignments$ = this.store.pipe(select(selectAllActiveAssignments));

        combineLatest( [this.vehicles$,this.cameras$,this.assignments$])
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
            let vehicles: Vehicle[] = res[0];
            let cameras: Camera[] = res[1];
            let assignments: AssignmentResponse[] = res[2];

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
 
        this.data.post("assignments", {} ,
        {cameraId: +formValue.vehicle, vehicleId: +formValue.vehicle}
        )
        .subscribe(
            () => {
                // let assignmentResponse = new AssignmentResponse();
                // assignmentResponse = {...this.currentAssignmentDetail};
                // assignmentResponse.deleted = true;
                // this.store.dispatch(new AssignmentSaved({assignment: assignmentResponse}))

                //We have to call dispatch as assignment creation endpoint is not returing. Created object
                this.store.dispatch(new AllAssignmentRequested());
                this.dialogRef.close();
            });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
      }

    // assign() {
    //     this.data.post("assignments", {}, {cameraId: 0, vehicleId: 1}).pipe(tap(r=>console.log(r))).subscribe();
    //   }
}

export class AssignmentInit {
    vehicle: Vehicle;
    camera: Camera;
}
