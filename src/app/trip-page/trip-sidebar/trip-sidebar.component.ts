import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/shared';

@Component({
  selector: 'app-trip-sidebar',
  templateUrl: 'trip-sidebar.component.html',
  styleUrls: ['trip-sidebar.component.css'],
})
export class TripSidebarComponent implements OnInit {
  trip?: Trip;
  overview = {
    name: 'Overview',
    subpath: '404',
    icon: 'bi bi-briefcase',
    activeIcon: 'bi bi-briefcase-fill',
  };
  toDo = {
    name: 'To Do',
    subpath: '404',
    icon: 'bi bi-clipboard2-check',
    activeIcon: 'bi bi-clipboard2-check-fill',
  };
  photos = {
    name: 'Photo Collection',
    subpath: '404',
    icon: 'bi bi-camera',
    activeIcon: 'bi bi-camera-fill',
  };
  edit = {
    name: 'Edit Trip',
    subpath: '404',
    icon: 'bi bi-pencil-square',
    activeIcon: 'bi bi-pencil-square',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.trip = data['trip'];
    });

    this.overview.subpath = `trips/${this.trip?.id}/overview`;
    this.toDo.subpath = `trips/${this.trip?.id}/todo`;
    this.photos.subpath = `trips/${this.trip?.id}/photos`;
    this.edit.subpath = `trips/${this.trip?.id}/edit`;
  }
}
