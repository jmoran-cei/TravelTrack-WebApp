import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/shared';

@Component({
  templateUrl: 'edit-trip.component.html',
  styleUrls: ['../new-trip/new-trip.component.css'],
})
export class EditTripComponent implements OnInit {
  isDirty?: boolean;
  trip!: Trip;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent?.data.forEach((data) => {
      this.trip = data['trip'];
    });
    console.log(this.trip);
  }
}
