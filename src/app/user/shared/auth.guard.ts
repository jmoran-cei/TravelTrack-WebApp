import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Subscription, take } from "rxjs";
import { AuthService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router) {}

  isLoggedIn?:Subscription
  authenticated?:boolean

  canActivate():boolean {
    this.isLoggedIn = this.auth.isLoggedIn$.pipe(take(1))
      .subscribe(value =>{
        // console.log('current value = ', value)
        this.authenticated = value
      });

    this.isLoggedIn.unsubscribe();
    // console.log("authenticated =", this.authenticated)
    if (this.authenticated) {
      return true
    }
    // temporarily commented out: don't need to be redirected to login while developing other pages
    // this.router.navigate(['/user/login'])
    // return false
    return true
  }
}
