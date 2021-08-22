import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  constructor(private data: DataService) { 

  }

  deleteAssignment(id: number) { 
    return this.data.post("delete-assignment/:id", { id });
  }
  addAssignment(cameraId: number, vehicleId: number) {
    return this.data.post("assignments", {} , {cameraId: cameraId, vehicleId:vehicleId}
    )
  }

  addVehicle(vehicleId: number, vehicleName: string) {
    return this.data.post("vehicles/:id", { id: vehicleId }, { name: vehicleName, cameraId: null })
  }

  addCamera(cameraId: number, deviceNo: string) {
    return this.data.post("cameras/:id", { id: cameraId }, { name: deviceNo, cameraId: null })
  }
}
