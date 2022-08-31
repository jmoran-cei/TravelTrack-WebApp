import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-sidebar-option',
  templateUrl: 'trip-sidebar-option.component.html',
  styleUrls: ['trip-sidebar-option.component.css'],
})

export class TripSidebarOptionComponent {
  @Input() properties!: Properties;

  constructor(public router: Router) {}
}

type Properties = {
  name: string;
  subpath: string;
  icon: string;
  activeIcon: string;
};
