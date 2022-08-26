import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { TripService } from '../shared';
import { take } from 'rxjs';

@Injectable()
export class TripResolver implements Resolve<any> {
  constructor(private tripService: TripService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.tripService.getTrip(route.params['id'])
      .pipe(take(1))
      .subscribe((response) => {
        if (!response) this.router.navigate(['404']); // if it trip doesn't exist, re-route to 404
      });

    return this.tripService.getTrip(route.params['id']);
  }
}
