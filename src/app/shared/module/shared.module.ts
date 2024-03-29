import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DestinationAutocompleteComponent,
  FormArrayComponent,
  FormFieldComponent,
  ValidationAlertComponent,
} from 'src/app/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    FormFieldComponent,
    ValidationAlertComponent,
    FormArrayComponent,
    DestinationAutocompleteComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GooglePlacesAPIKey,
      libraries: ['places'],
    }),
  ],
  exports: [
    FormFieldComponent,
    ValidationAlertComponent,
    FormArrayComponent,
    DestinationAutocompleteComponent,
  ],
})
export class SharedModule {}
