import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from '../../shared/models/trip.model';
import { TripDataService } from '../shared/trip-data.service';
import { factProps } from '../trip-fact/trip-fact.component';

@Component({
  templateUrl: 'trip-overview.component.html',
  styleUrls: ['trip-overview.component.css'],
})
export class TripOverviewComponent implements OnInit {
  trip?: ITrip;
  destinationsFact?: factProps;
  toDoFact?: factProps;
  photosFact?: factProps;
  daysUntilFact?: factProps;

  constructor(
    private tripDataService: TripDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent?.data.forEach((data) => {
      this.trip = data['trip'];
    });

    this.initAllProps();
  }

  initAllProps() {
    // insert component props for init

    this.initChildProps();
  }

  initChildProps() {
    // trip fact component props
    this.destinationsFact = {
      icon: 'bi bi-geo-alt-fill',
      digit: this.trip?.destinations?.length!,
      text:
        this.trip?.destinations?.length === 1 ? 'destination' : 'destinations',
      color: 'white',
    };
    this.toDoFact = {
      icon: 'bi bi-check2-circle',
      digit: this.trip?.toDo?.length!,
      text: this.trip?.toDo?.length === 1 ? 'task' : 'tasks',
      color: 'white',
    };
    this.photosFact = {
      icon: 'bi bi-camera-fill',
      digit: this.trip?.photos?.length!,
      text: this.trip?.photos?.length === 1 ? 'photo' : 'photos',
      color: 'white',
    };
    var daysUntil = this.tripDataService.numDayDifference(
      this.trip?.startDate!
    );
    this.daysUntilFact = {
      icon: 'bi bi-stopwatch-fill',
      digit: Math.abs(daysUntil),
      text:
        Math.abs(daysUntil) === 1 ? 'day' : 'days'
        + (daysUntil >= 0 ? ' left' : ' ago'),
      color: 'white',
    };
  }
}
