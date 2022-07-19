import { Component, Input } from "@angular/core";
import { TripService } from "../shared/trip.service";

@Component({
  selector: 'trip-thumbnail',
  templateUrl: 'trip-thumbnail.component.html',
  styleUrls: ['trip-thumbnail.component.css']
})

export class TripThumbnailComponent {
  @Input() trip:any
  multipleLocations!:boolean

  constructor(public tripService:TripService) {}

  ngOnInit() {
    this.multipleLocations = this.tripService.multipleLocations(this.trip.locations);
  }
}
