import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, FormControl } from "@angular/forms";

@Component({
  selector: 'app-form-field',
  templateUrl: 'form-field.component.html',
  styleUrls: ['form-field.component.css']
})

export class FormFieldComponent implements OnInit {
  control!:FormControl;
  @Input() hasInvalidStyling?:boolean;
  @Input() labelText?:string;
  @Input() placeholder!:string;
  @Input() controlName!:string;
  @Input() type!:string;
  @Input() isRequired!:boolean;
  @Input() isDisabled!:boolean;
  id!:string;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.control = <FormControl>this.controlContainer.control?.get(this.controlName);
    this.id = this.controlName;
  }

}
