import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { VehicleListComponent } from './vehicles/vehicle-list.component';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { VehicleEffects } from "./store/effects/vehicle.effects";
import { AssignmentListComponent } from './assignments/assignment-list.component';
import { AssignmentEffects } from "./store/effects/assignment.effects";
import { CameraEffects } from "./store/effects/camera.effects";
import { AssignmentDeleteDialogComponent } from "./assignments/assignment-delete-dialog.component";
import {ReactiveFormsModule} from "@angular/forms";
import { AssignmentAddDialogComponent } from "./assignments/assignment-add-dialog.component";

@NgModule({
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([VehicleEffects, AssignmentEffects, CameraEffects])
    // ,
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) 
    ],
  providers:[{provide: APP_BASE_HREF, useValue: '/'}],
  entryComponents: [AssignmentDeleteDialogComponent, AssignmentAddDialogComponent],
  declarations: [AppComponent, VehicleListComponent, AssignmentListComponent,AssignmentDeleteDialogComponent, AssignmentAddDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
