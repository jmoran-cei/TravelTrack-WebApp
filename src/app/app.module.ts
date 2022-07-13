import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TravelAppComponent } from './travel-app.component';
import { appRoutes } from './routes';

// components
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { Error404Component } from './errors/404.component';
import { HomePageComponent } from './home/home-page.component';
import { NavbarComponent } from './nav/navbar.component';

import {
  checkDirtyState, CreateTripComponent,
  NewTripThumbnailComponent,
  EarliestDateFirstPipe,
  LatestDateFirstPipe,
  TripService,
  TripOverviewComponent,
  TripRouteActivator,
  TripThumbnailComponent,
  TripListResolver,
  TripsListComponent,
  TripsTitleSectionComponent
} from './trips/index'

import {
  UserService,
  UserModule
} from './user/index'

@NgModule({
  declarations: [
    TravelAppComponent,
    NavbarComponent,
    HomePageComponent,
    BucketlistComponent,
    Error404Component,
    TripsListComponent,
    TripThumbnailComponent,
    NewTripThumbnailComponent,
    TripsTitleSectionComponent,
    CreateTripComponent,
    TripOverviewComponent,
    EarliestDateFirstPipe,
    LatestDateFirstPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TripService,
    UserService,
    TripRouteActivator,
    TripListResolver,
    { provide: 'canDeactivateCreateTrip', useValue: checkDirtyState }
  ],
  bootstrap: [TravelAppComponent]
})
export class AppModule { }
