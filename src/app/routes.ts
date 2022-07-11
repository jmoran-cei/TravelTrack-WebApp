import { Routes } from "@angular/router";
import { Error404Component } from "./errors/404.component";
import { HomePageComponent } from "./home/home-page.component";
import { CreateTripComponent } from "./trips/create-trip.component";
import { TripOverviewComponent } from "./trips/trip-overview/trip-overview.component";
import { TripRouteActivator } from "./trips/trip-overview/trip-route-activator.component";
import { TripsListComponent } from "./trips/trips-list.component";

export const appRoutes:Routes =[
  {path: 'home', component: HomePageComponent},
  {path: 'trips', component: TripsListComponent},
  {path: 'trips/new', component: CreateTripComponent, canDeactivate: ['canDeactivateCreateTrip']},
  {path: 'trips/:id', component: TripOverviewComponent, canActivate: [TripRouteActivator] },
  {path: '404', component: Error404Component},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
]

