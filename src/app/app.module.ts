import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { VehicleEffects } from "./store/effects/vehicle.effects";
import { AssignmentEffects } from "./store/effects/assignment.effects";
import { CameraEffects } from "./store/effects/camera.effects";
import {ReactiveFormsModule} from "@angular/forms";
import { NavigationComponent } from "./navigation.component";
import { VehicleAddDialogComponent } from './vehicles/vehicle-add-dialog/vehicle-add-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { AssignmentDeleteDialogComponent } from "./assignments/assignment-delete-dialog/assignment-delete-dialog.component";
import { AssignmentAddDialogComponent } from "./assignments/assignment-add-dialog/assignment-add-dialog.component";
import { AssignmentListComponent } from "./assignments/assignment-list/assignment-list.component";
import { VehicleListComponent } from "./vehicles/vehicle-list/vehicle-list.component";
import { CameraListComponent } from './camera/camera-list/camera-list.component';
import { CameraAddDialogComponent } from './camera/camera-add-dialog/camera-add-dialog.component';

@NgModule({
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([VehicleEffects, AssignmentEffects, CameraEffects])
    // ,
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) 
    ],
  providers:[{provide: APP_BASE_HREF, useValue: '/'}],
  entryComponents: [AssignmentDeleteDialogComponent, AssignmentAddDialogComponent, VehicleAddDialogComponent, CameraAddDialogComponent],
  declarations: [AppComponent, NavigationComponent, VehicleListComponent, AssignmentListComponent,AssignmentDeleteDialogComponent, AssignmentAddDialogComponent, VehicleAddDialogComponent, AdminComponent, CameraListComponent, CameraAddDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
