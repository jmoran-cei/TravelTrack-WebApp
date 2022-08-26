import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { DestinationsAutocompleteService } from '../autocomplete/service/destinationAutocomplete.service';

@Component({
  selector: 'form-array',
  templateUrl: 'form-array.component.html',
  styleUrls: [
    'form-array.component.css',
    '../form-field/form-field.component.css',
    '../../trips/new-trip/trip-form/trip-form.component.css',
  ],
})
export class FormArrayComponent {
  form!: FormGroup;
  array!: FormControl;
  @Input() hasInvalidStyling?: boolean;
  @Input() toggleAlert?: boolean;
  @Input() labelText?: string;
  @Input() itemText?: string;
  @Input() $placeholder!: string;
  @Input() $formArrayName!: string;
  @Input() $id!: string;
  @Input() isRequired!: boolean;
  isReadOnly = false;
  mouseoverAddValue?: boolean;

  // locally set props
  alertMessage!: string;

  // for dynamically added destination autocomplete ids
  autocompleteOptions: Options = new Options({
    fields: ['address_components', 'formatted_address', 'place_id'],
    types: ['(cities)'],
  });
  autocompletePlaceholder!: string;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private destinationsService: DestinationsAutocompleteService
  ) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.array = this.form.get(this.$formArrayName) as FormControl;
    this.alertMessage = this.itemText + ' must be valid before adding another ' + this.itemText + '.';
    this.autocompletePlaceholder = this.$placeholder;
  }

  // get values array
  get values():FormArray {
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
    // if its for destinations, save the destination object
    if (this.$formArrayName === 'destinations') {
      this.destinationsService.saveDestination();
    }

    // set added value as unchangeable and adjust appearance appropriately
    this.styleDivUnchangeable(this.$formArrayName,i);
    this.mouseoverAddValue=false; // disables mouseover add-button immediately
  }
  removeValue(i: number) {
    this.values.removeAt(i);
    // if its for destinations, save the destination object
    if (this.$formArrayName === 'destinations') {
      this.destinationsService.removeDestination(i);
    }
  }

  // make values READONLY when added
  // fieldName = $formArrayName+'Field'
  styleDivUnchangeable(fieldName: string, i: number) {
    // make input READONLY and remove bottom border
    let fieldInput = document.getElementById(fieldName+i);
    fieldInput!.setAttribute('readonly','readonly');
    fieldInput!.style.borderBottomColor='transparent';

    // change div background and border of field
    let field = document.getElementById(fieldName+'Field'+i)!;
    field!.style.backgroundColor='#e4e4f4';
    field!.style.borderRadius='10px';
  }
  // I could make this ^^^^ still happend without manipulating the DOM or even have to use ViewChild Decorator
  // by making the input as its own child component and using a boolean for "disabled" or "readonly" binded flag.
  // however, this is a change I'll jot down to hopefully get back to later
}
