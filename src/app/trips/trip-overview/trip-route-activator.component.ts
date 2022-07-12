import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { TripService } from "../shared/trip.service";

@Injectable()
export class TripRouteActivator implements CanActivate {
  constructor(private tripService:TripService, private router:Router) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    const eventExists = !!this.tripService.getTrip(+route.params['id'])
    if (!eventExists)
      this.router.navigate(['/404'])
    return eventExists
  }
}
