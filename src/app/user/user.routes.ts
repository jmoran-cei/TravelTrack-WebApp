import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import {
  NewAccountComponent,
  EditProfileComponent
} from '.';

export const userRoutes: Routes = [
  {
    path: 'profile',
    component: EditProfileComponent,
    canActivate: [MsalGuard],
  },
  { path: 'new-account', component: NewAccountComponent },
];
