import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Vehicle } from 'src/app/models/vehicle.model';
import { DataService } from 'src/app/services/data.service';
import { VehicleSaved } from 'src/app/store/actions/vehicle.actions.index';
import { ApplicationState } from 'src/app/store/states/application-state';

@Component({
  selector: 'app-vehicle-add-dialog',
  templateUrl: './vehicle-add-dialog.component.html',
  styleUrls: ['./vehicle-add-dialog.component.css']
})
export class VehicleAddDialogComponent implements OnInit {
  form: FormGroup;
  description: string = "Add Vehicle";
  vehicleId: number = null;
  constructor( private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleAddDialogComponent>,
    private data: DataService,
    private store: Store<ApplicationState> ,
    @Inject(MAT_DIALOG_DATA) id:number) {

      this.vehicleId = id;
     }

  ngOnInit(): void {

    this.form = this.fb.group({
      vehicleName: [null, Validators.required]
  });
  }

  close() {
    this.dialogRef.close();
   }

   save(){
    const formValue = this.form.value;

    const vehicle: Vehicle =   {
        id: this.vehicleId,
        name: formValue.vehicleName,
        cameraId: null

    };
    
    this.data.post("vehicles/:id", { id: this.vehicleId }, { name: formValue.vehicleName, cameraId: null })
    .subscribe(
        () => {     
            this.store.dispatch(new VehicleSaved({vehicle}));
            this.dialogRef.close();
        });
}




}
