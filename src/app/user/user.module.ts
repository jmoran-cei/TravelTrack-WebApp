import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EditProfileComponent } from "./edit-profile.component";
import { SettingsComponent } from "./settings.component";
import { UserService } from "./shared/user.service";
import { userRoutes } from "./user.routes";

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
