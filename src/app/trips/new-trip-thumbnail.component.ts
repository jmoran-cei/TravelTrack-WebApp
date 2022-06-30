import { Component, Input } from "@angular/core";
import { TripService } from "./shared/trip.service";

@Component({
  selector: 'new-trip-thumbnail',
  templateUrl: 'new-trip-thumbnail.component.html',
  styleUrls: ['new-trip-thumbnail.component.css']
})

export class NewTripThumbnailComponent {
  @Input() title = ''
  @Input() description = ''

  constructor(private tripService:TripService) {}


}
