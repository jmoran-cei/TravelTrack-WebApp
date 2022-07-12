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
  trip:any

  constructor(private tripService:TripService, private route:ActivatedRoute) {
  }

  multipleLocations(locations:any) {
    if (locations.length > 1) {
      return true
    }
    return false
  }

  ngOnInit() {
    this.trip = this.tripService.getTrip(+this.route.snapshot.params['id'])
  }
}
