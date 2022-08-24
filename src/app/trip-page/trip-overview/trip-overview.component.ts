import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ITrip } from "../../shared/models/trip.model";
import { TripService } from "../../trips/shared/trip.service";

@Component({
  selector: 'trip-overview',
  templateUrl: 'trip-overview.component.html',
  styleUrls: ['trip-overview.component.css']
})

export class TripOverviewComponent {
  trip?:ITrip
  multipleDestinations!:boolean

  constructor(public tripService:TripService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.trip = data['trip']
    })

    this.multipleDestinations = this.tripService.hasMultipleDestinations(this.trip?.destinations!);
  }
}
