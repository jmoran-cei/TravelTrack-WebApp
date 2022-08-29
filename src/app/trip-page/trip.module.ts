import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import {
  TripItineraryComponent,
  TripPageComponent,
  TripPhotosComponent,
  TripSidebarComponent,
  TripToDoComponent,
  tripRoutes
} from '.'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(tripRoutes)
  ],
  declarations: [
    TripItineraryComponent,
    TripPageComponent,
    TripPhotosComponent,
    TripSidebarComponent,
    TripToDoComponent
  ],
  providers: []
})

export class TripModule { }
