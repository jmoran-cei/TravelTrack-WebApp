import { Routes } from "@angular/router";

import {
  NewAccountComponent,
  EditProfileComponent,
  LoginComponent,
  SettingsComponent,
  AuthGuard
} from '.'

export const userRoutes:Routes = [
  { path: 'profile', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'new-account', component: NewAccountComponent }

]
