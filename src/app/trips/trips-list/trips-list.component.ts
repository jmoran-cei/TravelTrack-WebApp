import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ITrip } from "../shared/trip.model";
import { TripService } from "../shared/trip.service";

@Component({
  templateUrl: 'trips-list.component.html',
  styleUrls: ['trips-list.component.css']
})

export class TripsListComponent {
  currentTime = new Date()
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

    // collapse id for toggling collapse for Upcoming and Previous sections
    upcomingCollapse = "upcoming-collapse"
    previousCollapse = "previous-collapse"

  constructor(private tripService: TripService, private route:ActivatedRoute) {}

  ngOnInit() {

    // get all upcoming trips
    this.upcomingTrips = this.route.snapshot.data['trips']
      .filter( (trip:ITrip) => trip.startDate.getTime() >= this.currentTime.getTime() )

    // get all previous trips
    this.previousTrips = this.route.snapshot.data['trips']
      .filter( (trip:ITrip) => trip.startDate.getTime() < this.currentTime.getTime() )

    }
}
