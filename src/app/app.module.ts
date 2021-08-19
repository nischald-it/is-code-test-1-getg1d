import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { APP_BASE_HREF } from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./store/reducers";

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, MaterialModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) 
    ],
  providers:[{provide: APP_BASE_HREF, useValue: '/'}],
  declarations: [AppComponent, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
