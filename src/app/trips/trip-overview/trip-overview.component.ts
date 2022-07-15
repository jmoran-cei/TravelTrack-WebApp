import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ITrip } from "../shared/trip.model";
import { TripService } from "../shared/trip.service";

@Component({
  selector: 'trip-overview',
  templateUrl: 'trip-overview.component.html',
  styleUrls: ['trip-overview.component.css']
})

export class TripOverviewComponent {
  trip!:ITrip

  constructor(public tripService:TripService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.trip = this.tripService.getTrip(+this.route.snapshot.params['id'])

    this.trip.multipleLocations = this.tripService.multipleLocations(this.trip.locations);
  }
}
