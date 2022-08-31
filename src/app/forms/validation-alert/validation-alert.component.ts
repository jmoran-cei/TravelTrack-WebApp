import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-validation-alert',
  template: `

    <div *ngIf="validationBoolean" [ngClass]="{'alert alert-danger': enableStyling }">
      <span class="glyphicon glyphicon glyphicon-remove-circle"></span> {{alertText}}
    </div>

  `
})

export class ValidationAlertComponent {
  @Input() alertText?:string;
  @Input() validationBoolean?:boolean;
  @Input() enableStyling=true //defaulted to true (will be used more, than not)
}
