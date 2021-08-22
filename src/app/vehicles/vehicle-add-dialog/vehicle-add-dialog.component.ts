import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataManagementService } from 'src/app/services/data-management.service';
import { StoreService } from 'src/app/services/store.service';
import { Vehicle } from '../..//models/vehicle.model';


@Component({
  selector: 'app-vehicle-add-dialog',
  templateUrl: './vehicle-add-dialog.component.html',
  styleUrls: ['./vehicle-add-dialog.component.css']
})
export class VehicleAddDialogComponent implements OnInit {
  form: FormGroup;
  description: string = "Add Vehicle";
  vehicleId: number = null;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleAddDialogComponent>,
    private dataManagementService: DataManagementService,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) id: number) {

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

  save() {
    const formValue = this.form.value;

    const vehicle: Vehicle = {
      id: this.vehicleId,
      name: formValue.vehicleName,
      cameraId: null

    };

    this.dataManagementService.addVehicle(this.vehicleId, formValue.vehicleName)
      .subscribe(
        () => {
          this.storeService.SaveVehicle(vehicle)
          this.dialogRef.close();
        });
  }
}
