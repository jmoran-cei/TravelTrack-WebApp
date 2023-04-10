import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { TripOverviewComponent, TripToDoComponent, TripPhotosComponent } from '.';
import { EditTripComponent } from '../trips';

export const tripRoutes: Routes = [
  { path: 'edit', component: EditTripComponent, canActivate: [MsalGuard] },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: TripOverviewComponent,
    canActivate: [MsalGuard],
  },
  { path: 'todo', component: TripToDoComponent, canActivate: [MsalGuard] },
  { path: 'photos', component: TripPhotosComponent, canActivate: [MsalGuard] },
];
