import { Routes } from '@angular/router';

import {
  NewAccountComponent,
  EditProfileComponent,
  LoginComponent,
  AuthGuard,
} from '.';

export const userRoutes: Routes = [
  {
    path: 'profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'new-account', component: NewAccountComponent },
];
