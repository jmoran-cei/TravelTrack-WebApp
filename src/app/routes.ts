import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { HomePageComponent } from './home/home-page.component';
import {
  NewTripComponent,
  TripListResolver,
  TripsListComponent,
} from './trips';
import { TripPageComponent, TripResolver } from './trip-page';
import { MsalGuard } from '@azure/msal-angular';

export const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  {
    path: 'trips',
    component: TripsListComponent,
    resolve: { trips: TripListResolver },
    canActivate: [MsalGuard],
  },
  {
    path: 'trips/new',
    component: NewTripComponent,
    canActivate: [MsalGuard],
    canDeactivate: ['canDeactivateTripForm'],
  },
  {
    path: 'trips/:id',
    component: TripPageComponent,
    resolve: { trip: TripResolver },
    canActivate: [MsalGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () =>
      import('./trip-page/trip.module').then((m) => m.TripModule),
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Error404Component }, // if page doesn't exist, display 404 page
];
