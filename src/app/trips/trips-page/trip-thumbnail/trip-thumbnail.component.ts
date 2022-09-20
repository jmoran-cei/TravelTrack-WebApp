import { Component, Input, OnInit } from "@angular/core";
import { Trip } from "src/app/shared";
import { TripService } from "../../shared/trip.service";

@Component({
  selector: 'app-trip-thumbnail',
  templateUrl: 'trip-thumbnail.component.html',
  styleUrls: ['trip-thumbnail.component.css']
})

export class TripThumbnailComponent implements OnInit {
  @Input() trip!:Trip
  multipleDestinations!:boolean

  constructor(public tripService:TripService) {}

  ngOnInit() {
    this.multipleDestinations = this.tripService.hasMultipleDestinations(this.trip.destinations);
  }
}
