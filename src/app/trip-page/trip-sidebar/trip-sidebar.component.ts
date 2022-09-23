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
    subpath: 'overview',
    icon: 'bi bi-briefcase',
    activeIcon: 'bi bi-briefcase-fill',
  };
  toDo = {
    name: 'To Do',
    subpath: 'todo',
    icon: 'bi bi-clipboard2-check',
    activeIcon: 'bi bi-clipboard2-check-fill',
  };
  edit = {
    name: 'Edit Trip',
    subpath: 'edit',
    icon: 'bi bi-pencil-square',
    activeIcon: 'bi bi-pencil-square',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.trip = data['trip'];
    });
  }
}
