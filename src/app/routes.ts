import { Routes } from "@angular/router";
import { BucketlistComponent } from "./bucketlist/bucketlist.component";
import { Error404Component } from "./errors/404.component";
import { HomePageComponent } from "./home/home-page.component";
import { CreateTripComponent } from "./trips/create-trip/create-trip.component";
import { TripOverviewComponent } from "./trips/trip-overview/trip-overview.component";
import { TripRouteActivator } from "./trips/trip-overview/trip-route-activator.component";
import { TripListResolver } from "./trips/trips-list/trips-list-resolver.component";
import { TripsListComponent } from "./trips/trips-list/trips-list.component";

export const appRoutes:Routes =[
  {path: 'home', component: HomePageComponent},
  {path: 'bucketlist', component: BucketlistComponent},
  {path: 'trips', component: TripsListComponent, resolve: {trips:TripListResolver}},
  {path: 'trips/new', component: CreateTripComponent, canDeactivate: ['canDeactivateCreateTrip']},
  {path: 'trips/:id', component: TripOverviewComponent, canActivate: [TripRouteActivator] },
  {path: '404', component: Error404Component},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'user',
    loadChildren: () => import ('./user/user.module').then(m => m.UserModule)
  }
]

