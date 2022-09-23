import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { userRoutes } from './user.routes';
import {
  EditProfileComponent,
  LoginComponent,
  UserService,
  NewAccountComponent,
} from './index';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from '../shared';
import { SharedModule } from '../shared/module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [EditProfileComponent, LoginComponent, NewAccountComponent],
  providers: [UserService],
})
export class UserModule {}
