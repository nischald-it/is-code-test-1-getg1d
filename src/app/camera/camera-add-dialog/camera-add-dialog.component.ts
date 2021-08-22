import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataManagementService } from 'src/app/services/data-management.service';
import { StoreService } from 'src/app/services/store.service';
import { Camera } from 'src/app/models/camera.model';

@Component({
  selector: 'app-camera-add-dialog',
  templateUrl: './camera-add-dialog.component.html',
  styleUrls: ['./camera-add-dialog.component.css']
})
export class CameraAddDialogComponent implements OnInit {
    form: FormGroup;
    description: string = "Add Camera";
    cameraId: number = null;
    constructor(private fb: FormBuilder,
      private dialogRef: MatDialogRef<CameraAddDialogComponent>,
      private dataManagementService: DataManagementService,
      private storeService: StoreService,
      @Inject(MAT_DIALOG_DATA) id: number) {
  
      this.cameraId = id;
    }
  
    ngOnInit(): void {
  
      this.form = this.fb.group({
        deviceNo: [null, Validators.required]
      });
    }
  
    close() {
      this.dialogRef.close();
    }
  
    save() {
      const formValue = this.form.value;
  
      const camera: Camera = {
        id: this.cameraId,
        deviceNo: formValue.deviceNo,
        vehicleId: null
  
      };
  
      this.dataManagementService.addCamera(this.cameraId, formValue.deviceNo)
        .subscribe(
          () => {
            this.storeService.SaveCamera(camera)
            this.dialogRef.close();
          });
    }
  }
