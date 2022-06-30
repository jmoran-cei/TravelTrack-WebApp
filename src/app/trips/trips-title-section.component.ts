import { Component, Input } from "@angular/core";

@Component({
  selector: 'trips-title-section',
  templateUrl: 'trips-title-section.component.html',
  styleUrls: ['trips-title-section.component.css']
})

export class TripsTitleSectionComponent {
  @Input() title:any
}
