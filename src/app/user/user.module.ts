import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { userRoutes } from "./user.routes";
import {
  EditProfileComponent,
  LoginComponent,
  SettingsComponent,
  UserService,
  NewAccountComponent
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
    LoginComponent,
    NewAccountComponent
  ],
  providers: [
    UserService
  ]
})

export class UserModule { }
