import { Routes } from "@angular/router";
import { BucketlistComponent } from "./bucketlist/bucketlist.component";
import { Error404Component } from "./errors/404.component";
import { HomePageComponent } from "./home/home-page.component";
import {
  CreateTripComponent,
  TripOverviewComponent,
  TripRouteActivator,
  TripListResolver,
  TripsListComponent
} from './trips'
import { AuthGuard } from "./user/shared/auth.guard";

export const appRoutes:Routes =[
  {path: 'home', component: HomePageComponent},
  {path: 'bucketlist', component: BucketlistComponent, canActivate: [AuthGuard]},
  {path: 'trips', component: TripsListComponent, resolve: {trips:TripListResolver}, canActivate: [AuthGuard]},
  {path: 'trips/new', component: CreateTripComponent, canActivate: [AuthGuard], canDeactivate: ['canDeactivateCreateTrip']},
  {path: 'trips/:id', component: TripOverviewComponent, canActivate: [AuthGuard, TripRouteActivator] },
  {path: '404', component: Error404Component},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'user',
    loadChildren: () => import ('./user/user.module').then(m => m.UserModule)
  },
  {path: '**', component: Error404Component} // if page doesn't exist, display 404 page
]

