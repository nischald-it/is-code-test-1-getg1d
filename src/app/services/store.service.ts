import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { AssignmentResponse } from '../models/assignment.model';
import { Camera } from '../models/camera.model';
import { Vehicle } from '../models/vehicle.model';
import { AllAssignmentRequested, AssignmentDeleted } from '../store/actions/assignment.actions.index';
import { VehicleSaved } from '../store/actions/vehicle.actions.index';
import { selectAllActiveAssignments } from '../store/selectors/assignment.selectors';
import { selectAllCameras } from '../store/selectors/camera.selectors';
import { selectAllVehicles } from '../store/selectors/vehicle.selectors';
import { ApplicationState } from '../store/states/application-state';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private assignments$: Observable<AssignmentResponse[]>;
  private vehicles$: Observable<Vehicle[]>;
  private cameras$: Observable<Camera[]>;

  constructor(private store: Store<ApplicationState>) {
    this.assignments$ = this.store.pipe(select(selectAllActiveAssignments));
    this.vehicles$ = this.store.pipe(select(selectAllVehicles));
    this.cameras$ = this.store.pipe(select(selectAllCameras));   

  }

  getAllEntities() : Observable<[AssignmentResponse[],Vehicle[], Camera[]]> {
    return combineLatest([this.assignments$, this.vehicles$, this.cameras$])
  }
  getAllVehicles() : Observable< Vehicle[]> {
    return this.vehicles$;
  }

  refreshAssignment()  {
    this.store.dispatch(new AllAssignmentRequested());
  }
  deleteAssignenment(assignmentResponse: AssignmentResponse) {
    this.store.dispatch(new AssignmentDeleted({assignment: assignmentResponse}))
  }

  SaveVehicle(vehicle : Vehicle) {
    return this.store.dispatch(new VehicleSaved({vehicle}));
  }
}
