import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router) {}

  canActivate():boolean {
    if (this.auth.isLoggedIn$.getValue()) {
      return true
    }
    // alert('You are not logged in.') // would like to have a styled alert or something show up in the future
    this.router.navigate(['/user/login'])
    return false


    // is it better to return an observable<boolean> instead?
  }
}
