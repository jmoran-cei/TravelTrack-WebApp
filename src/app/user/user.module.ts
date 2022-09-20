import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { userRoutes } from "./user.routes";
import {
  EditProfileComponent,
  LoginComponent,
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
    LoginComponent,
    NewAccountComponent
  ],
  providers: [
    UserService
  ]
})

export class UserModule { }
