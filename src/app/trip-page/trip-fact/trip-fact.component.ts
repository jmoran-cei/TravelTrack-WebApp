import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trip-fact',
  templateUrl: 'trip-fact.component.html',
  styleUrls: ['trip-fact.component.css'],
})
export class TripFactComponent {
  @Input() properties?: factProps;
}

export type factProps = {
  icon: string;
  digit: number;
  text: string;
  color: string;
};
