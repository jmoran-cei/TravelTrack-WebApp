import { Component, Input } from '@angular/core';
import { TripPhoto } from 'src/app/shared';

@Component({
  selector: 'app-trip-photo',
  templateUrl: './trip-photo.component.html',
  styleUrls: ['./trip-photo.component.css']
})
export class TripPhotoComponent {
  @Input() photo?: TripPhoto;

  constructor() { }

}
