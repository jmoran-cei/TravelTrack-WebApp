import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Trip } from 'src/app/shared/models/trip.model';
import { DestinationsService } from '../autocomplete/service/destinations.service';


@Component({
  selector: 'app-form-array',
  templateUrl: 'form-array.component.html',
  styleUrls: [
    'form-array.component.css',
    '../form-field/form-field.component.css',
    '../../trips/trip-forms/trip-form/trip-form.component.css',
  ],
})
export class FormArrayComponent implements OnInit {
  form!: FormGroup;
  array!: FormControl;
  @Input() hasInvalidStyling?: boolean;
  @Input() toggleAlert?: boolean;
  @Input() labelText?: string;
  @Input() itemText?: string;
  @Input() placeholder!: string;
  @Input() formArrayName!: string;
  @Input() id!: string;
  @Input() isRequired!: boolean;
  mouseoverAddValue?: boolean;

  // locally set props
  alertMessage!: string;

  // props for EDIT FORM
  @Input() isEditing!: boolean;
  @Input() existingTrip?: Trip;

  // for dynamically added destination autocomplete ids
  autocompleteOptions: Options = new Options({
    fields: ['address_components', 'place_id'],
    types: ['(cities)'],
  });
  autocompletePlaceholder!: string;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private destinationsService: DestinationsService
  ) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
    this.array = this.form.get(this.formArrayName) as FormControl;
    this.alertMessage = this.itemText + ' must be valid before adding another ' + this.itemText + '.';
    this.autocompletePlaceholder = this.placeholder;
  }

  // get values array
  get values():FormArray {
    return <FormArray>this.form.get(this.formArrayName);
  }

  // value methods
  buildValues():FormControl {
    if (this.isRequired) {
      return new FormControl('',Validators.required);
    }
    return new FormControl('');
  }
  addValue(i: number) {
    // if its for destinations, save the destination object
    if (this.formArrayName === 'destinations') {

      this.destinationsService.saveDestination();

      // set saved/dest displayed form value
      let dest = this.destinationsService.savedDestinations[i];
      // autocomplete doesn't update the value when selecting a suggested destination, so use their data and display appropriate value
      let destFormValue = (dest.country === 'United States') ? `${dest.city}, ${dest.region}, USA` : `${dest.city}, ${dest.country}`;
      this.form.get('destinations.'+i)?.setValue(destFormValue)

      /*
        BUG (only for VIEW):
        Anytime a user removes a destination (that isn't the last added one) from the form.. the view is still correct.
        But once a user adds a new destination after this, the view will 'change' it and display a blank value (only shows placeholder),
        eventhough that specific control value for the destination is correctly added and present in the FormGroup.
        I think it could be an issue with the ngx-google-places-autocomplete directive for the input component (on destination-autocomplete component), but I'm not sure.
        The destination value is correct, but it just won't display it when adding action occurs.

        I spent A LOT of time trying to debug and resolve the issue, but I can't figure it out and don't find it necessary to
        waste toooo much time fixing something like this. Hopefully, I figure out in the future.

        NOTE: the form array values display/works perfectly fine for adding/removing members, just not destinations
      */
    }

    // add new blank value to Values array
    this.values.push(this.buildValues());

    // set added value as unchangeable and adjust appearance appropriately
    this.styleDivUnchangeable(this.formArrayName,i);
    this.mouseoverAddValue=false; // disables mouseover add-button immediately
  }
  removeValue(i: number) {
    this.values.removeAt(i);
    // if its for destinations, save the destination object
    if (this.formArrayName === 'destinations') {
      this.destinationsService.removeSavedDestination(i);
    }
  }

  // make value disabled and style surrounding div when added
  styleDivUnchangeable(fieldName: string, i: number) {
    // make input DISABLED and remove bottom border
    let fieldInput = document.getElementById(fieldName+i);
    fieldInput!.setAttribute('disabled','disabled');

    fieldInput!.style.borderBottomColor='transparent';

    // change div background and border of field
    let field = document.getElementById(fieldName+'Field'+i)!;
    field!.style.backgroundColor='#e4e4f4';
    field!.style.borderRadius='10px';
  }
  // I could make this ^^^^ still happen without manipulating the DOM
  // by making the input as its own child component and using a boolean for "disabled" binded flag and conditional styling
  // however, this is a change I'll jot down to hopefully get back to later
}
