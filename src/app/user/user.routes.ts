import { Routes } from "@angular/router";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { LoginComponent } from "./login/login.component";
import { SettingsComponent } from "./settings/settings.component";

export const userRoutes:Routes = [
  { path: 'profile', component: EditProfileComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'login', component: LoginComponent}
]
