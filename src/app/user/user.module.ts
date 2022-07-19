import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import {
  EditProfileComponent,
  LoginComponent,
  SettingsComponent,
  UserService,
  userRoutes
} from './index'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    EditProfileComponent,
    SettingsComponent,
    LoginComponent
  ],
  providers: [
    UserService
  ]
})

export class UserModule { }
