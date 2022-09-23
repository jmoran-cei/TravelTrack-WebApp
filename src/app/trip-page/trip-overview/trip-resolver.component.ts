import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { TripService } from '../../trips/.';
import { take } from 'rxjs';
import { Trip } from 'src/app/shared';
import { AuthService } from 'src/app/user';

@Injectable()
export class TripResolver implements Resolve<any> {
  constructor(
    private tripService: TripService,
    private router: Router,
    private auth: AuthService
  ) {}

  // verify if the user is a member of the trip
  checkUserIsMemberOfTrip(trip: Trip): boolean {
    for (let member of trip.members) {
      if (member.username === this.auth.currentUser.username) return true;
    }

    return false;
  }

  resolve(route: ActivatedRouteSnapshot) {
    this.tripService
      .getTrip(route.params['id'])
      .pipe(take(1))
      .subscribe((response) => {
        if (!response || !this.checkUserIsMemberOfTrip(response)) {
          this.router.navigate(['404']); // if trip doesn't exist, re-route to 404
        }
      });

    return this.tripService.getTrip(route.params['id']);
  }
}
