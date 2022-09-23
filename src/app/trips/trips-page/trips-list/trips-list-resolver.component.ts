import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TripService } from '../../shared/trip.service';

@Injectable()
export class TripListResolver implements Resolve<any> {
  constructor(private tripService: TripService) {}

  resolve() {
    return this.tripService.getTrips();
  }
}
