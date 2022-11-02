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
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { DataService } from '../shared';
import { SharedModule } from '../shared/module/shared.module';
import { ChangePasswordFormComponent } from './edit-profile/change-password-form/change-password-form.component';
import { ProfileFormComponent } from './edit-profile/profile-form/profile-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes),
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(DataService, {
    //   dataEncapsulation: false,
    //   passThruUnknownUrl: true,
    // }),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    EditProfileComponent,
    LoginComponent,
    NewAccountComponent,
    ProfileFormComponent,
    ChangePasswordFormComponent,
  ],
  providers: [UserService],
})
export class UserModule {}
