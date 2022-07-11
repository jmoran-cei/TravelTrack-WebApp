import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';

import { HomePageComponent } from './home/home-page.component';
import { NavbarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { TravelAppComponent } from './travel-app.component';
import { CreateTripComponent } from './trips/create-trip.component';
import { NewTripThumbnailComponent } from './trips/new-trip-thumbnail.component';
import { TripService } from './trips/shared/trip.service';
import { TripOverviewComponent } from './trips/trip-overview/trip-overview.component';
import { TripRouteActivator } from './trips/trip-overview/trip-route-activator.component';
import { TripThumbnailComponent } from './trips/trip-thumbnail.component';
import { TripsListComponent } from './trips/trips-list.component';
import { TripsTitleSectionComponent } from './trips/trips-title-section.component';
import { UserService } from './user/shared/user.service';

@NgModule({
  declarations: [
    TravelAppComponent,
    NavbarComponent,
    HomePageComponent,
    Error404Component,
    TripsListComponent,
    TripThumbnailComponent,
    NewTripThumbnailComponent,
    TripsTitleSectionComponent,
    CreateTripComponent,
    TripOverviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TripService,
    UserService,
    TripRouteActivator,
    { provide: 'canDeactivateCreateTrip', useValue: checkDirtyState }
  ],
  bootstrap: [TravelAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateTripComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}
