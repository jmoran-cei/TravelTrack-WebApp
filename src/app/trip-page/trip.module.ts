import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import {
  TripItineraryComponent,
  TripPageComponent,
  TripPhotosComponent,
  TripSidebarComponent,
  TripToDoComponent,
  tripRoutes,
  TripSidebarOptionComponent
} from '.'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(tripRoutes)
  ],
  declarations: [
    TripItineraryComponent,
    TripPageComponent,
    TripPhotosComponent,
    TripSidebarComponent,
    TripToDoComponent,
    TripSidebarOptionComponent
  ],
  providers: []
})

export class TripModule { }
