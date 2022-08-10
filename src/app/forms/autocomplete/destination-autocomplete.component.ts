import { Component, Input } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import { Options } from "ngx-google-places-autocomplete/objects/options/options";

@Component({
  selector: 'autocomplete',
  template: `
<ng-container [formGroup]="form">
    <input ngx-google-places-autocomplete [attr.id]="id" [options]="options!" [formControlName]="$formControlName"
    type="text" [placeholder]="placeholder" (onAddressChange)="DestinationChange($event)"
    [ngClass]="{'input-red': hasInvalidStyling}"/>
</ng-container>
  `,
  styleUrls: ['../form-field/form-field.component.css'],
  styles:[`
    input {
      width: 100%;
    }
  `]
})

export class DestinationAutocompleteComponent {
  form!:FormGroup;
  @Input() index!:number;
  @Input() id!:string;
  @Input() hasInvalidStyling?:boolean;
  @Input() options?:Options;
  @Input() placeholder?:string;
  @Input() isDynamic!:boolean;
  $formControlName!:string;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.form = <FormGroup>this.controlContainer.control;

    // isDyanamic (used as input for form array) --> formcontrolname is index of that array
    // !isDyanamic (used as input for single control) --> formcontrolname is the same as the id
    if (this.isDynamic) {
      this.$formControlName = String(this.index);
    } else {
      this.$formControlName = this.id;
    }
  }

  public DestinationChange(address: any) {
    let addr_comps = address.address_components
    let city!:string;
    let region!:string;
    let country!:string;


    // for each address component
    for (let comp in addr_comps) {
      let current_comp = addr_comps[comp];

      // check the component type to see if it matches
      for (let type in current_comp.types) {
        let current_type = current_comp.types[type];

        // set to city, if city
        if(current_type==="locality") {
          city = current_comp.long_name;
          // console.log(city);
          continue;
        }

        // set to region, if region
        if(current_type==="administrative_area_level_1") {
          region = current_comp.long_name;
          // console.log(region);
          continue;
        }

        // set to country, if country
        if(current_type==="country") {
          country = current_comp.long_name;
          // console.log(country);
          continue;
        }

      }
    }

    const destination = {
      city: city,
      region: region,
      country: country
    }

    return destination;

    // there is the use case that a user enters any random text or a name that doesn't match Google's API
    // If I get time, I'll handle this (probably by only allowing a user to select a valid place according to Google's autocorrect)
  }
}
