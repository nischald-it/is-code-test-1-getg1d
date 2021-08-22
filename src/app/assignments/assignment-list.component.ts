import { Component, OnDestroy, OnInit } from '@angular/core';


import { combineLatest, forkJoin, Observable, ReplaySubject, Subject } from 'rxjs';
import { DataService } from '../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { ApplicationState, VehiclesState } from '../store/states/application-state';
import { AllVehicleRequested, VehicleSaved } from '../store/actions/vehicle.actions.index';
import { Vehicle } from '../models/vehicle.model';
import { selectAllVehicles } from '../store/selectors/vehicle.selectors';
import { Update } from '@ngrx/entity';
import { selectAllActiveAssignments, selectAllAssignments } from '../store/selectors/assignment.selectors';
import { Assignment, AssignmentRequest, AssignmentResponse } from '../models/assignment.model';
import { AllAssignmentRequested } from '../store/actions/assignment.actions.index';
import { map, takeUntil } from 'rxjs/operators';
import { AssignmentDetail } from '../dto/assignmentDisplay.model';
import { AllCameraRequested } from '../store/actions/camera.actions.index';
import { Camera } from '../models/camera.model';
import { selectAllCameras } from '../store/selectors/camera.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AssignmentDeleteDialogComponent } from './assignment-delete-dialog.component';
import { AssignmentAddDialogComponent } from './assignment-add-dialog.component';
import { StoreService } from '../services/store.service';


export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})

export class AssignmentListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterValue: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<ApplicationState>, private dialog: MatDialog, private storeService: StoreService) { }
  displayedColumns: string[] = ['id', 'vehicleName', 'deviceNo', 'crud'];
  dataSource: MatTableDataSource<AssignmentDetail> = new MatTableDataSource<AssignmentDetail>();

  ngOnInit(): void {

    this.store.dispatch(new AllVehicleRequested());
    this.store.dispatch(new AllAssignmentRequested());
    this.store.dispatch(new AllCameraRequested());

    this.storeService.getAllEntities()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        var assingments = res[0];
        var vehicles = res[1];
        var cameras = res[2];
        var assignmentDetails = assingments.map((a) => {
          let v = vehicles.find(v => v.id === a.vehicleId);
          let c = cameras.find(c => c.id === a.cameraId);

          let m: AssignmentDetail = { ...a, vehicleName: v.name, deviceNo: c.deviceNo }
          return m;

        })

        this.dataSource = new MatTableDataSource<AssignmentDetail>(assignmentDetails);
        this.dataSource.filter
        this.setPaginator();
        this.setSort();
      })


  }
  ngAfterViewInit() {
    this.setPaginator();
    this.setSort();
  }
  setPaginator() {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  setSort() {
    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteAssignment(event, assignmentDetail: AssignmentDetail) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = assignmentDetail;

    const dialogRef = this.dialog.open(AssignmentDeleteDialogComponent,
      dialogConfig);


  }

  onAddAssignment() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    const dialogRef = this.dialog.open(AssignmentAddDialogComponent,
      dialogConfig);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
