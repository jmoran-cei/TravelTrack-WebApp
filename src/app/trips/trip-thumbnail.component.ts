import { Component, Input } from "@angular/core";
import { ILocation } from "./shared/trip.model";
import { TripService } from "./shared/trip.service";

@Component({
  selector: 'trip-thumbnail',
  templateUrl: 'trip-thumbnail.component.html',
  styleUrls: ['trip-thumbnail.component.css']
})

export class TripThumbnailComponent {
  @Input() trip:any
  locations:ILocation[] = []
  
  multipleLocations(trip:any) {
    if (trip.length > 1) {
      return true
    }
    return false
  }
}
