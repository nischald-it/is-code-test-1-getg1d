import { Component, OnDestroy, OnInit } from '@angular/core';


import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { takeUntil } from 'rxjs/operators';
import { AssignmentDetail } from '../../dto/assignmentDisplay.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StoreService } from '../../services/store.service';
import { AssignmentDeleteDialogComponent } from '../assignment-delete-dialog/assignment-delete-dialog.component';
import { AssignmentAddDialogComponent } from '../assignment-add-dialog/assignment-add-dialog.component';


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

  constructor(private dialog: MatDialog, private storeService: StoreService) { }
  displayedColumns: string[] = ['id', 'vehicleName', 'deviceNo', 'crud'];
  dataSource: MatTableDataSource<AssignmentDetail> = new MatTableDataSource<AssignmentDetail>();

  ngOnInit(): void {

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
