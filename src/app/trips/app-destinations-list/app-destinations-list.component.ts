import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-destinations-list',
  template: `
    <ng-container *ngFor="let destination of destinations">
      <!-- if the country of a given destination is "United States", then abbreviate it as "U.S."-->
      <span [ngSwitch]="destination?.country">
        <p *ngSwitchCase="'United States'">{{destination?.city}}, {{destination?.region}}, U.S.</p>
        <p *ngSwitchDefault>{{destination?.city}}, {{destination?.country}}</p>
      </span>
    </ng-container>
  `,
  styleUrls: ['app-destinations-list.component.css']
})

export class DestinationsListComponent {
  @Input() destinations!:any
}

