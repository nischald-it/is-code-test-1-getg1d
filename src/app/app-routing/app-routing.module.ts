import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreDataResolver } from '../../resolver/store-data.resolver';
import { AdminComponent } from '../admin/admin.component';
import { AssignmentListComponent } from '../assignments/assignment-list/assignment-list.component';
import { CameraListComponent } from '../camera/camera-list/camera-list.component';
import { VehicleListComponent } from '../vehicles/vehicle-list/vehicle-list.component';



const routes: Routes = [

  {path: "admin", component: AdminComponent,
  children: [
    {path: "assignments", component: AssignmentListComponent},
    {path: "vehicles", component: VehicleListComponent},
    {path: "cameras", component: CameraListComponent},
    { path: '',   redirectTo: '/assignments', pathMatch: 'full' },
  ],
  resolve: {result: StoreDataResolver}},
  { path: '',   redirectTo: '/admin/assignments', pathMatch: 'full' },
  {path: "**", redirectTo: '/admin/assignments', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
