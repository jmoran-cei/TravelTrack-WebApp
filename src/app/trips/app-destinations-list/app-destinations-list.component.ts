import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-destinations-list',
  template: `
    <ng-container *ngFor="let destination of destinations">
      <!-- if the country of a given destination is "United States", then abbreviate it as "U.S."-->
      <span [ngSwitch]="destination?.country">
        <p *ngSwitchCase="'United States'">{{destination?.city}}, {{destination?.stateProv}}, U.S.</p>
        <p *ngSwitchDefault>{{destination?.city}}, {{destination?.country}}</p>
      </span>
    </ng-container>
  `,
  styles: [`
    p {
      margin: 2px 0;
      font-size: 17px;
    }
  `]
})

export class DestinationsListComponent {
  @Input() destinations!:any
}

