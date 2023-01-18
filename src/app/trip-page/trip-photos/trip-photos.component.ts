import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/shared';

@Component({
  selector: 'app-trip-photos',
  templateUrl: './trip-photos.component.html',
  styleUrls: ['./trip-photos.component.css']
})
export class TripPhotosComponent implements OnInit {
  trip!: Trip;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent?.data.forEach((data) => {
      this.trip = data['trip'];
    });
  }

}
