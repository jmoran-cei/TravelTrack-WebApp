import { Injectable } from '@angular/core';
import { Destination } from 'src/app/shared';

@Injectable()
export class DestinationsService {
  /*
    PURPOSE: the purpose of this service is to help with creating separate array to keep track of destination objects.
    - When using google autocomplete, the user 'clicking' on an autocorrect prediction it adds that destination to the tempDestinations array
    - When the user clicks "add", the last tempDestination will be saved into the savedDestinations array (the array that ends up being mapped to final submitted Trip object)
  */

  // holds all entered destinations from API by user
  tempDestinations: Destination[] = [];
  // saves destination from holding array when user hits add/remove destination
  savedDestinations: Destination[] = [];

  addTempDestination(destination: Destination) {
    this.tempDestinations.push(destination);
  }

  saveDestination() {
    let destination: Destination;
    destination = this.tempDestinations[this.tempDestinations.length - 1];

    this.savedDestinations.push(destination);
    this.clearTempDestinations();
  }

  removeSavedDestination(destIndex: number) {
    this.savedDestinations.splice(destIndex, 1);
  }

  clearTempDestinations() {
    this.tempDestinations = [];
  }

  clearAllDestinations() {
    this.clearTempDestinations();
    this.savedDestinations = [];
  }
}
