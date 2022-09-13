import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-date',
  templateUrl: 'calendar-date.component.html',
  styleUrls: ['calendar-date.component.css'],
})
export class CalendarDateComponent {
  @Input() props?: calendarDateProps;
}

export type calendarDateProps = {
  title?: string;
  color: string;
  date: Date;
};
