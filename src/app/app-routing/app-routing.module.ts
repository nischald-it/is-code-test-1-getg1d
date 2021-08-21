import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentListComponent } from '../assignments/assignment-list.component';
import { VehicleListComponent } from '../vehicles/vehicle-list.component';


const routes: Routes = [
  {path: "assignments", component: AssignmentListComponent},
  {path: "vehicles", component: VehicleListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
