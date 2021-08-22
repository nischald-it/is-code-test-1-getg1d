import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Camera } from '../../models/camera.model';
import { StoreService } from '../../services/store.service';
import { CameraAddDialogComponent } from '../camera-add-dialog/camera-add-dialog.component';

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.css']
})
export class CameraListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private storeService: StoreService, private router: Router, private dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'deviceNo', 'EditDelete'];
  dataSource: MatTableDataSource<Camera> = new MatTableDataSource<Camera>();
  filterValue: string;
  nextId: number;

  ngOnInit(): void {

    this.storeService.getAllCameras()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cameras: Camera[]) => {
        this.nextId = Math.max(...cameras.map(c => c.id)) + 1;
        this.dataSource = new MatTableDataSource<Camera>(cameras);
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

  onAddCamera() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = this.nextId;


    const dialogRef = this.dialog.open(CameraAddDialogComponent,
      dialogConfig);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}


