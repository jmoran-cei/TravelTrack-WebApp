import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { TripService } from '../../trips/.';
import { catchError, map, of, take } from 'rxjs';
import { Trip } from 'src/app/shared';
import { AuthService } from 'src/app/shared';
import { HttpErrorResponse } from '@angular/common/http';

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
      if (member.username === this.auth.getCurrentUser().username) return true;
    }

    return false;
  }

  resolve(route: ActivatedRouteSnapshot) {
    if (isNaN(route.params['id'])) {
      this.router.navigate(['404']);
      return;
    }

    return this.tripService
      .getTrip(route.params['id'])
      .pipe(
        take(1),
        map((response) => {
          if (!response || !this.checkUserIsMemberOfTrip(response)) {
            this.router.navigate(['404']); // if trip doesn't exist, re-route to 404
          }
          return response;
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 404) {
            this.router.navigate(['404']);
          } else {
            this.router.navigate(['/trips']);
            window.alert(`The trip you tried to reach either doesn't exist or there was a problem on our end retrieving it`);
          }
          return of(err)
        })
      )
  }
}
