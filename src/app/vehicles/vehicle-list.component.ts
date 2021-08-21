import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
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
  selector: 'app-vehicles',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  vehicles$: Observable<Vehicle[]>;
  
  constructor(private store: Store<ApplicationState> ) { }
  displayedColumns: string[] = ['id', 'name', 'EditDelete'];
  dataSource : MatTableDataSource<Vehicle>;
  filterValue: string;
  // dataToDisplay = [...ELEMENT_DATA];

  //dataSource = new ExampleDataSource(this.dataToDisplay);

  // dataSource = new MatTableDataSource<Vehicle>(ELEMENT_DATA);
  // getVehicles(): Observable<Vehicle[]> {
  //   return this.data.get<Vehicle[]>("vehicles");
  // }

  ngOnInit(): void {

    

    this.store.dispatch(new AllVehicleRequested());
    // this.getVehicles().subscribe((v) => {
    //   this.store.dispatch(new AllVehicleRequested());
    // }); 
    
    this.vehicles$ = this.store.pipe(select(selectAllVehicles));

    this.vehicles$.subscribe((data: Vehicle[]) => {
      this.dataSource = new MatTableDataSource<Vehicle>(data);
      this.filterData();
      this.setPaginator();
      this.setSort();

    })  

    // const vehicle: Update<Vehicle> = {
    //   id: 2,
    //   changes: {
    //     name: 'Test Vehicle',
    //     cameraId: 101
    //   }
    // };

    const vehicle: Vehicle =   {
      id: 2,
        name: 'Test Vehicle',
        cameraId: 101

    };

    this.store.dispatch(new VehicleSaved({vehicle}));
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

}


class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}
