import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-trip-thumbnail',
  templateUrl: 'new-trip-thumbnail.component.html',
  styleUrls: ['new-trip-thumbnail.component.css'],
})
export class NewTripThumbnailComponent {
  @Input() title = '';
  @Input() description = '';
}
