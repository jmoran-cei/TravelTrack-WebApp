import { Component, Input } from '@angular/core';
import { Trip, NavigationService } from 'src/app/shared';
import { TripService } from '../../shared/trip.service';

@Component({
  selector: 'app-trip-thumbnail',
  templateUrl: 'trip-thumbnail.component.html',
  styleUrls: ['trip-thumbnail.component.css'],
})
export class TripThumbnailComponent {
  @Input() trip!: Trip;

  constructor(public tripService: TripService, public nav: NavigationService) {}
}
