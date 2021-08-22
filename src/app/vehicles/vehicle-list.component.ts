import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Vehicle } from '../models/vehicle.model';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VehicleAddDialogComponent } from './vehicle-add-dialog/vehicle-add-dialog.component';
import { StoreService } from '../services/store.service';

export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private storeService: StoreService, private router: Router, private dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'name', 'EditDelete'];
  dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>();
  filterValue: string;
  nextId: number;

  ngOnInit(): void {

    this.storeService.getAllVehicles()
      .pipe(takeUntil(this.destroy$))
      .subscribe((vehicles: Vehicle[]) => {
        this.nextId = Math.max(...vehicles.map(v => v.id)) + 1;
        this.dataSource = new MatTableDataSource<Vehicle>(vehicles);
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

  onAddVehicle() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = this.nextId;


    const dialogRef = this.dialog.open(VehicleAddDialogComponent,
      dialogConfig);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

