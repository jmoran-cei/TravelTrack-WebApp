import { Component, Input, Output } from '@angular/core';
import { ITrip } from '../../../shared/models/trip.model';
import { TripService } from '../../shared/trip.service';

@Component({
  selector: 'trips-title-section',
  templateUrl: 'trips-title-section.component.html',
  styleUrls: ['trips-title-section.component.css'],
})
export class TripsTitleSectionComponent {
  @Input() title = '';
  @Input() collapseID = '';
  @Input() tripList: ITrip[] = [];
  @Input() sortToggle = '';

  constructor(public tripService: TripService) {}
}
