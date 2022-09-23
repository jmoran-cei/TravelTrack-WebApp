import { Component, Input } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { TripService } from '../../shared/trip.service';

@Component({
  selector: 'app-trips-title-section',
  templateUrl: 'trips-title-section.component.html',
  styleUrls: ['trips-title-section.component.css'],
})
export class TripsTitleSectionComponent {
  @Input() title = '';
  @Input() collapseID = '';
  @Input() tripList: Trip[] = [];
  @Input() sortToggle = '';

  constructor(public tripService: TripService) {}
}
