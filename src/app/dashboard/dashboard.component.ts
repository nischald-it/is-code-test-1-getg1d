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
import { LoadVehiclesAction } from '../store/actions';
import { Vehicle } from '../models/vehicle.model';
import { vehiclesSelector } from '../store/selectors/all-selectors';

export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: Vehicle[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  vahicles$: Observable<VehiclesState>;
  
  constructor(private data: DataService, private store: Store<ApplicationState> ) { }
  displayedColumns: string[] = ['id', 'name', 'EditDelete'];
  dataToDisplay = [...ELEMENT_DATA];

  //dataSource = new ExampleDataSource(this.dataToDisplay);

  dataSource = new MatTableDataSource<Vehicle>(ELEMENT_DATA);
  getVehicles(): Observable<Vehicle[]> {
    return this.data.get<Vehicle[]>("vehicles");
  }
  ngOnInit(): void {
    this.getVehicles().subscribe((v) => {
      this.store.dispatch(new LoadVehiclesAction(v));
    }); 
    
    this.vahicles$ = this.store.pipe(select(vehiclesSelector));

    this.vahicles$.subscribe((data: VehiclesState) => {
      this.dataSource = new MatTableDataSource<Vehicle>(data.vehicles);

    })
   
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
