import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/authentication.service";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  username?:string
  password?:string
  mouseoverLogin?:boolean

  constructor(private authService:AuthService, private router:Router) {}

  login(username:string, password:string) {
    this.authService.loginUser(username,password)

    this.router.navigate(['trips'])
  }

}
