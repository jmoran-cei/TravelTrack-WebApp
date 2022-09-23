import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-alert',
  templateUrl: 'validation-alert.component.html',
})
export class ValidationAlertComponent {
  @Input() alertText?: string;
  @Input() validationBoolean?: boolean;
  @Input() enableStyling = true; //defaulted to true (will be used more, than not)
}
