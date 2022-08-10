import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TravelAppComponent } from './travel-app.component';
import { appRoutes } from './routes';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './shared/data/data.service';
import { HttpClientModule } from '@angular/common/http';


// components
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { Error404Component } from './errors/404.component';
import { NavbarComponent } from './nav/navbar.component';

import {
  checkDirtyState,
  NewTripComponent,
  NewTripThumbnailComponent,
  EarliestDateFirstPipe,
  LatestDateFirstPipe,
  TripService,
  TripOverviewComponent,
  TripRouteActivator,
  TripThumbnailComponent,
  TripListResolver,
  TripsListComponent,
  TripsTitleSectionComponent,
  DestinationsListComponent,
  TripFormComponent
} from './trips/index'

import {
  UserService,
  AuthService,
  AuthGuard
} from './user'

import {
  HomePageComponent,
  HomeSection1Component,
  ColumnBoxComponent
} from './home'

import {
  FormFieldComponent,
  FormArrayComponent,
  ValidationAlertComponent,
  DestinationAutocompleteComponent,
} from './forms'


@NgModule({
  declarations: [
    TravelAppComponent,
    NavbarComponent,
    HomePageComponent,
    HomeSection1Component,
    ColumnBoxComponent,
    BucketlistComponent,
    Error404Component,
    TripsListComponent,
    TripThumbnailComponent,
    NewTripThumbnailComponent,
    TripsTitleSectionComponent,
    NewTripComponent,
    FormFieldComponent,
    ValidationAlertComponent,
    FormArrayComponent,
    DestinationAutocompleteComponent,
    TripOverviewComponent,
    EarliestDateFirstPipe,
    LatestDateFirstPipe,
    DestinationsListComponent,
    TripFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    GooglePlaceModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TripService,
    UserService,
    AuthService,
    AuthGuard,
    TripRouteActivator,
    TripListResolver,
    { provide: 'canDeactivateCreateTrip', useValue: checkDirtyState }
  ],
  bootstrap: [TravelAppComponent]
})
export class AppModule { }
