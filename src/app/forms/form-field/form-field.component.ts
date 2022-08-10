import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AbstractControl, ControlContainer, FormControl } from "@angular/forms";

@Component({
  selector: 'form-field',
  templateUrl: 'form-field.component.html',
  styleUrls: ['form-field.component.css']
})

export class FormFieldComponent {
  control!:FormControl;
  @Input() hasInvalidStyling?:boolean;
  @Input() labelText?:string;
  @Input() $placeholder!:string;
  @Input() $formControlName!:string;
  @Input() $type!:string;
  @Input() isRequired!:boolean;
  $id!:string;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.control = <FormControl>this.controlContainer.control?.get(this.$formControlName);
    this.$id = this.$formControlName;
  }

}
