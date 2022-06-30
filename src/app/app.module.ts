import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomePageComponent } from './home/home-page.component';
import { NavbarComponent } from './nav/nav-bar.component';
import { TravelAppComponent } from './travel-app.component';
import { NewTripThumbnailComponent } from './trips/new-trip-thumbnail.component';
import { TripService } from './trips/shared/trip.service';
import { TripThumbnailComponent } from './trips/trip-thumbnail.component';
import { TripsListComponent } from './trips/trips-list.component';
import { TripsTitleSectionComponent } from './trips/trips-title-section.component';

@NgModule({
  declarations: [
    TravelAppComponent,
    NavbarComponent,
    HomePageComponent,
    TripsListComponent,
    TripThumbnailComponent,
    NewTripThumbnailComponent,
    TripsTitleSectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TripService],
  bootstrap: [TravelAppComponent]
})
export class AppModule { }
