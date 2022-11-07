import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Trip } from '../../../shared/models/trip.model';

@Component({
  templateUrl: 'trips-list.component.html',
  styleUrls: ['trips-list.component.css'],
})
export class TripsListComponent implements OnInit {
  currentTime = new Date();
  upcomingTrips: Observable<Trip[]> = of([]);
  previousTrips: Observable<Trip[]> = of([]);

  // displayed on new-trip-thumbnail
  // title and description for "create new trip" thumbnail in UPCOMING trip section
  createUpcomingTrip_Title = 'Create New Trip';
  createUpcomingTrip_Description =
    'Plan your next adventure and remember it forever!';

  // title and description for "create new trip" thumbnail in PREVIOUS trip section
  createPreviousTrip_Title = 'Add Previous Trip';
  createPreviousTrip_Description =
    'Save your details and memories in one spot!';

  // displayed on trips-title-section
  // Upcoming Trips section title
  upcomingTrips_SectionTitle = 'Upcoming Trips';
  // Previous Trips section title
  previousTrips_SectionTitle = 'Previous Trips';

  // collapse id for toggling collapse for Upcoming and Previous sections
  upcomingCollapse = 'upcoming-collapse';
  previousCollapse = 'previous-collapse';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // get all upcoming trips
    this.upcomingTrips = of(this.route.snapshot.data['trips'].filter(
      (trip: Trip) =>
        new Date(trip.endDate).getTime() >= this.currentTime.getTime()
    ));

    // get all previous trips
    this.previousTrips = of(this.route.snapshot.data['trips'].filter(
      (trip: Trip) =>
        new Date(trip.endDate).getTime() < this.currentTime.getTime()
    ));
  }
}
