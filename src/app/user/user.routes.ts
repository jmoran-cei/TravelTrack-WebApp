import { Routes } from "@angular/router";
import { EditProfileComponent } from "./edit-profile.component";
import { SettingsComponent } from "./settings.component";

export const userRoutes:Routes = [
  { path: 'profile', component: EditProfileComponent},
  { path: 'settings', component: SettingsComponent}
]
