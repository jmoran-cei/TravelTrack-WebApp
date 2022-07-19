import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import {
  EditProfileComponent,
  SettingsComponent,
  UserService,
  userRoutes
} from './index'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    EditProfileComponent,
    SettingsComponent
  ],
  providers: [
    UserService
  ]
})

export class UserModule { }
