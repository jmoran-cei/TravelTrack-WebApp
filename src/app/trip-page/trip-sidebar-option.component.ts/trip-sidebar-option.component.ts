import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/shared';

@Component({
  selector: 'app-trip-sidebar-option',
  templateUrl: 'trip-sidebar-option.component.html',
  styleUrls: ['trip-sidebar-option.component.css'],
})
export class TripSidebarOptionComponent {
  @Input() properties!: Properties;

  constructor(public nav: NavigationService) {}
}

type Properties = {
  name: string;
  subpath: string;
  icon: string;
  activeIcon: string;
};
