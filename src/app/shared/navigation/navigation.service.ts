import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private ngZone: NgZone, private router: Router) { }

  /*
    Using this to replace routerLink where necessary as I was getting Angular Zone related/delayed loading warnings:
    Console -> "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
  */
  public navigate(subpaths: any[]): void {
    // needed in order to trigger appropriate change detection when user wants to change navigation
    // became necessary after implementing "getTripImgUrl()" in TripService in relation with Trip Resolvers
    this.ngZone.run(() => this.router.navigate(subpaths)).then();
  }
}
