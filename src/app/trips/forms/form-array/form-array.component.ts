import { Component, Input } from "@angular/core";
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { Options } from "ngx-google-places-autocomplete/objects/options/options";

@Component({
  selector: 'form-array',
  templateUrl: 'form-array.component.html',
  styleUrls: [
    'form-array.component.css',
    '../form-field/form-field.component.css',
    '../trip-form/trip-form.component.css'
  ]
})


export class FormArrayComponent {
  form!:FormGroup;
  array!:FormControl;
  @Input() hasInvalidStyling?:boolean;
  @Input() toggleAlert?:boolean;
  @Input() labelText?:string;
  @Input() itemText?:string;
  @Input() $placeholder!:string;
  @Input() $formArrayName!:string;
  @Input() $id!:string;
  @Input() isRequired!:boolean;
  mouseoverAddValue?:boolean;

  // locally set props
  alertMessage!:string;
  destAlertText!:string;

  //for dynamically added destination autocomplete ids
  autocompleteOptions:Options = new Options ({
    fields: ["address_components","geometry", "name", "icon"],
    types: ["(cities)"]
  });
  autocompletePlaceholder!:string;

  constructor(private rootFormGroup:FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.array = this.form.get(this.$formArrayName) as FormControl;
    this.alertMessage = this.itemText + ' must be valid before adding another ' + this.itemText + '.';
    this.destAlertText ='Destination(s) is required.';
    this.autocompletePlaceholder = this.$placeholder;
  }

  // get values array
  get values(): FormArray{ // capitalized to prevent duplicate identifier
    return <FormArray>this.form.get(this.$formArrayName);
  }

  // value methods
  buildValues():FormControl {
    if (this.isRequired) {
      return new FormControl('',Validators.required);
    }
    return new FormControl('');
  }
  addValue(i: number) {
    // add value to Values array
    this.values.push(this.buildValues());

    // set added value as unchangeable and adjust appearance appropriately
    this.styleInputAsReadonly(this.$formArrayName,i);
    this.mouseoverAddValue=false; // disables mouseover add button immediately
  }
  removeValue(i: number) {
    this.values.removeAt(i);
  }

  // make values READONLY when added
  // fieldName = $formArrayName+'Field'
  styleInputAsReadonly(fieldName: string, i: number) {
    // make input READONLY and remove bottom border
    let fieldInput = document.getElementById(fieldName+i);
    fieldInput!.setAttribute('readonly','readonly');
    fieldInput!.style.borderBottomColor='transparent';

    // change background and border of field
    let field = document.getElementById(fieldName+'Field'+i)!;
    field!.style.backgroundColor='#e4e4f4';
    field!.style.borderRadius='10px';
  }

}
