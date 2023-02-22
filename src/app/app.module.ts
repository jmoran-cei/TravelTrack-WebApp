import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TravelAppComponent } from './travel-app.component';
import { appRoutes } from './routes';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { DataService } from './shared/data/data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { TripPhotoService } from './shared';

import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import {
  MsalModule,
  MsalGuardConfiguration,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MSAL_GUARD_CONFIG,
  MsalInterceptorConfiguration,
  MsalInterceptor,
  MsalBroadcastService,
  MsalService,
  MsalGuard,
} from '@azure/msal-angular';

import {
  msalConfig,
  msalGuardConfig,
  msalInterceptorConfig,
} from './auth-config';
import { MsalRedirectComponent } from './msal-redirect/msal-redirect.component';

/**************************************
 * MSAL SET UP
 */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return msalInterceptorConfig;
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return msalGuardConfig;
}
/*
 * MSAL SET UP
/**************************************/

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
    MsalRedirectComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    MsalModule
  ],
  providers: [
    TripService,
    UserService,
    AuthService,
    DestinationsService,
    TripPhotoService,
    AuthGuard,
    TripListResolver,
    TripResolver,
    TripDataService,
    { provide: 'canDeactivateTripForm', useValue: checkDirtyState },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [TravelAppComponent, MsalRedirectComponent],
})
export class AppModule {}
