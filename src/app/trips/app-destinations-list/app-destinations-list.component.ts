import { Component, Input } from '@angular/core';
import { Destination } from 'src/app/shared';

@Component({
  selector: 'app-destinations-list',
  templateUrl: 'app-destinations-list.component.html',
  styleUrls: ['app-destinations-list.component.css'],
})
export class DestinationsListComponent {
  @Input() destinations?: Destination[];
  @Input() showIcon!: boolean;
  @Input() showFrame!: boolean;
}
