import { Component, Input, Output } from "@angular/core";
import { TripService } from "./shared/trip.service";

@Component({
  selector: 'trips-title-section',
  templateUrl: 'trips-title-section.component.html',
  styleUrls: ['trips-title-section.component.css']
})

export class TripsTitleSectionComponent {
  @Input() title:any
  @Input() collapseID:any
  @Input() tripList:any[]=[]

  // true => filtering by Title (A-Z)
  // false => filtering by Date (recent-oldest)
  filterToggle=false

  constructor(public tripService:TripService) {

  }
}
