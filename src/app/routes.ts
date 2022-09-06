import { Routes } from "@angular/router";
import { BucketlistComponent } from "./bucketlist/bucketlist.component";
import { Error404Component } from "./errors/404.component";
import { HomePageComponent } from "./home/home-page.component";
import {
  NewTripComponent,
  TripListResolver,
  TripsListComponent,
  EditTripComponent
} from './trips'
import {
  TripPageComponent,
  TripResolver
} from "./trip-page";
import { AuthGuard } from "./user/shared/auth.guard";

export const appRoutes:Routes =[
  {path: 'home', component: HomePageComponent},
  {path: 'bucketlist', component: BucketlistComponent, canActivate: [AuthGuard]},
  {path: 'trips', component: TripsListComponent, resolve: {trips:TripListResolver}, canActivate: [AuthGuard]},
  {path: 'trips/new', component: NewTripComponent, canActivate: [AuthGuard], canDeactivate: ['canDeactivateTripForm']},
  {
    path: 'trips/:id', component: TripPageComponent, resolve: {trip:TripResolver}, canActivate: [AuthGuard],
    loadChildren: () => import ('./trip-page/trip.module').then(m => m.TripModule)
  },
  {path: '404', component: Error404Component},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'user',
    loadChildren: () => import ('./user/user.module').then(m => m.UserModule)
  },
  {path: '**', component: Error404Component} // if page doesn't exist, display 404 page
]

