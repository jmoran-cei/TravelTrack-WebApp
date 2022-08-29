import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from 'src/app/shared';

@Component({
  selector: 'trip-sidebar',
  templateUrl: 'trip-sidebar.component.html',
  styleUrls: ['trip-sidebar.component.css'],
})

export class TripSidebarComponent {
  trip?: ITrip;
  overview = {
    name: 'Overview',
    subpath: 'overview',
    icon: 'bi bi-briefcase',
    activeIcon: 'bi bi-briefcase-fill',
  };
  itinerary = {
    name: 'Itinerary',
    subpath: 'itinerary',
    icon: 'bi bi-geo-alt',
    activeIcon: 'bi bi-geo-alt-fill',
  };
  toDo = {
    name: 'To Do',
    subpath: 'todo',
    icon: 'bi bi-clipboard2-check',
    activeIcon: 'bi bi-clipboard2-check-fill',
  };
  photos = {
    name: 'Photo Collection',
    subpath: 'photos',
    icon: 'bi bi-camera',
    activeIcon: 'bi bi-camera-fill',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.trip = data['trip'];
    });
  }
}
