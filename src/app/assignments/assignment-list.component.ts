import { Component, OnInit } from '@angular/core';


import { combineLatest, forkJoin, Observable, ReplaySubject } from 'rxjs';
import { DataService } from '../services/data.service';
import {MatPaginator} from '@angular/material/paginator';
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
import { map } from 'rxjs/operators';
import { AssignmentDetail } from '../dto/assignmentDisplay.model';
import { AllCameraRequested } from '../store/actions/camera.actions.index';
import { Camera } from '../models/camera.model';
import { selectAllCameras } from '../store/selectors/camera.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AssignmentDeleteDialogComponent } from './assignment-delete-dialog.component';
import { AssignmentAddDialogComponent } from './assignment-add-dialog.component';

export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}


// const ELEMENT_DATA: Vehicle[] = [
//   {id: 1, name: 'Hydrogen'},
//   {id: 2, name: 'Helium'},
//   {id: 3, name: 'Lithium'},
//   {id: 4, name: 'Beryllium'},
//   {id: 5, name: 'Boron'},
//   {id: 6, name: 'Carbon'},
//   {id: 7, name: 'Nitrogen'},
//   {id: 8, name: 'Oxygen'},
//   {id: 9, name: 'Fluorine'},
//   {id: 10, name: 'Neon'},
// ];

@Component({
  selector: 'app-assignments',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
// export class AssignmentListComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

export class AssignmentListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  assignments$: Observable<AssignmentResponse[]>;
  vehicles$: Observable<Vehicle[]>;
  cameras$: Observable<Camera[]>;
  filterValue: string;
  
  constructor(private store: Store<ApplicationState> ,private dialog: MatDialog) { }
  displayedColumns: string[] = ['id', 'vehicleName', 'deviceNo', 'crud'];
  // dataToDisplay = [...ELEMENT_DATA];

  //dataSource = new ExampleDataSource(this.dataToDisplay);

  dataSource : MatTableDataSource<AssignmentDetail>;
  // getVehicles(): Observable<Vehicle[]> {
  //   return this.data.get<Vehicle[]>("vehicles");
  // }

  ngOnInit(): void {

    
    this.store.dispatch(new AllVehicleRequested());
    this.store.dispatch(new AllAssignmentRequested());
    this.store.dispatch(new AllCameraRequested());
    
    this.assignments$ = this.store.pipe(select(selectAllActiveAssignments));
    this.vehicles$ = this.store.pipe(select(selectAllVehicles));
    this.cameras$ = this.store.pipe(select(selectAllCameras));

    // this.assignments$.subscribe((data: AssignmentRequest[]) => {
    //   console.log(JSON.)
    // })  

    combineLatest([this.assignments$, this.vehicles$, this.cameras$])
    .subscribe((res) => {
      var assingments = res[0];
      var vehicles = res[1];
      var cameras = res[2];
      var assignmentDetails = assingments.map((a) => {
        let v = vehicles.find(v => v.id === a.vehicleId);
        let c = cameras.find(c => c.id === a.cameraId);
        
        let m: AssignmentDetail = {...a, vehicleName: v.name , deviceNo: c.deviceNo }
        return m;      
        
      })

      this.dataSource = new MatTableDataSource<AssignmentDetail>(assignmentDetails);
      this.filterData();
      this.setPaginator();
      this.setSort();

      // this.deleteAssignment(assignmentDetails[0]);
     })
 

  }
  ngAfterViewInit() {
    this.setPaginator();
    this.setSort();
  }
  setPaginator() {
    if(this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  setSort() {
    if(this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
    }   
  }
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterData();
  }
  filterData() {
    if(this.filterValue) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    }
    
  }

  onDeleteAssignment(event, assignmentDetail:AssignmentDetail) {

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

  // dialogConfig.data = assignmentDetail;

  const dialogRef = this.dialog.open(AssignmentAddDialogComponent,
      dialogConfig);

}

}
