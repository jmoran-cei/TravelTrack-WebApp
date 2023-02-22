import { Routes } from '@angular/router';
import { MsalRedirectComponent } from '@azure/msal-angular';

import {
  NewAccountComponent,
  EditProfileComponent,
  AuthGuard,
} from '.';

export const userRoutes: Routes = [
  {
    path: 'profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'new-account', component: NewAccountComponent },
];
