import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TravelAppComponent } from './travel-app.component';
import { appRoutes } from './routes';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { DataService } from './shared/data/data.service';
import { HttpClientModule } from '@angular/common/http';

import { Error404Component } from './errors/404.component';
import { NavbarComponent } from './nav/navbar.component';

import {
  checkDirtyState,
  NewTripComponent,
  NewTripThumbnailComponent,
  EarliestDateFirstPipe,
  LatestDateFirstPipe,
  TripService,
  TripThumbnailComponent,
  TripListResolver,
  TripsListComponent,
  TripsTitleSectionComponent,
  DestinationsListComponent,
  TripFormComponent,
  EditTripComponent,
} from './trips/index';

import { UserService, AuthService, AuthGuard } from './user';

import {
  HomePageComponent,
  HomeSection1Component,
  ColumnBoxComponent,
} from './home';

import { DestinationsService } from './forms';

import {
  TripOverviewComponent,
  TripResolver,
  TripFactComponent,
  TripDataService,
  CalendarDateComponent,
  ToDoListComponent,
  MembersListComponent,
} from './trip-page';
import { SharedModule } from './shared/module/shared.module';

@NgModule({
  declarations: [
    TravelAppComponent,
    NavbarComponent,
    HomePageComponent,
    HomeSection1Component,
    ColumnBoxComponent,
    Error404Component,
    TripsListComponent,
    TripThumbnailComponent,
    NewTripThumbnailComponent,
    TripsTitleSectionComponent,
    NewTripComponent,
    EarliestDateFirstPipe,
    LatestDateFirstPipe,
    DestinationsListComponent,
    TripFormComponent,
    EditTripComponent,
    TripOverviewComponent,
    TripFactComponent,
    CalendarDateComponent,
    ToDoListComponent,
    MembersListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(DataService, {
    //   dataEncapsulation: false,
    //   passThruUnknownUrl: true,
    // }),
    RouterModule.forRoot(appRoutes),
    SharedModule,
  ],
  providers: [
    TripService,
    UserService,
    AuthService,
    DestinationsService,
    AuthGuard,
    TripListResolver,
    TripResolver,
    TripDataService,
    { provide: 'canDeactivateTripForm', useValue: checkDirtyState },
  ],
  bootstrap: [TravelAppComponent],
})
export class AppModule {}
