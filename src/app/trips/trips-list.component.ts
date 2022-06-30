import { Component } from "@angular/core";
import { ITrip } from "./shared/trip.model";
import { TripService } from "./shared/trip.service";

@Component({
  selector: 'trips-list',
  templateUrl: 'trips-list.component.html',
  styleUrls: ['trips-list.component.css']
})

export class TripsListComponent {
  upcomingOrPreviousTrips: any[] = []
  upcomingTrips: ITrip[] = []
  previousTrips: ITrip[] = []

  // displayed on new-trip-thumbnail
    // title and description for "create new trip" thumbnail in UPCOMING trip section
    createUpcomingTrip_Title = "Create New Trip"
    createUpcomingTrip_Description = "Plan your next adventure and remember it forever!"

    // title and description for "create new trip" thumbnail in PREVIOUS trip section
    createPreviousTrip_Title = "Add Previous Trip"
    createPreviousTrip_Description = "Save your details and memories in one spot!"

  // displayed on trips-title-section
    // Upcoming Trips section title
    upcomingTrips_SectionTitle = "Upcoming Trips"
    // Previous Trips section title
    previousTrips_SectionTitle = "Previous Trips"



  constructor(private tripService: TripService) {

  }

  ngOnInit() {
    this.upcomingOrPreviousTrips = this.tripService.getUpcomingOrPreviousTrips()
    this.upcomingTrips = this.upcomingOrPreviousTrips[0]
    this.previousTrips = this.upcomingOrPreviousTrips[1]
    //this.locations = this.tripService.getLocations()
  }
}
