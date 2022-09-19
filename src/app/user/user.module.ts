import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { userRoutes } from "./user.routes";
import {
  EditProfileComponent,
  LoginComponent,
  SettingsComponent,
  UserService,
  NewAccountComponent
} from './index'
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { DataService } from "../shared";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EditProfileComponent,
    SettingsComponent,
    LoginComponent,
    NewAccountComponent,
  ],
  providers: [
    UserService
  ]
})

export class UserModule { }
