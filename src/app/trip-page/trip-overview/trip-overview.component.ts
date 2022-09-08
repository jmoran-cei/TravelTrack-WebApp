import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from '../../shared/models/trip.model';
import { calendarDateProps } from '../calendar-date/calendar-date.component';
import { TripDataService } from '../shared/trip-data.service';
import { toDoListProps } from '../todo-list/todo-list.component';
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
  durationFact?: factProps;
  calStartDate?: calendarDateProps;
  calEndDate?: calendarDateProps;
  toDoList?: toDoListProps;

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
    var daysUntil = this.tripDataService.numDayDifference(
      this.trip?.startDate!
    );
    var duration = this.tripDataService.numDayDifference(
      this.trip?.endDate!,
      this.trip?.startDate!
    );
    this.daysUntilFact = {
      icon: 'bi bi-hourglass-split',
      digit: Math.abs(daysUntil),
      text:
        Math.abs(daysUntil) === 1
          ? 'day'
          : 'days' + (daysUntil >= 0 ? ' left' : ' ago'),
      color: 'white',
    };
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
    this.durationFact = {
      icon: 'bi bi-stopwatch-fill',
      digit: duration,
      text: duration === 1 ? 'day' : 'days',
      color: 'rgb(31,31,31)',
    };

    // calendar date component props
    this.calStartDate = {
      title: 'start',
      color: 'green',
      date: this.trip?.startDate!,
    };
    this.calEndDate = {
      title: 'end',
      color: 'red',
      date: this.trip?.endDate!,
    };

    // to do list component prop
    this.toDoList = {
      toDo: this.trip?.toDo!,
      display: {
        all: true,
        showIcons: true,
      },
    };
  }
}
