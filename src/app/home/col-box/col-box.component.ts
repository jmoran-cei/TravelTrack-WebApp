import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-col-box',
  templateUrl: 'col-box.component.html',
  styleUrls: ['col-box.component.css'],
})
export class ColumnBoxComponent {
  @Input() boxTitle?: string;
  @Input() boxDesc?: string;
}
