import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    return {
      trips: [
        {
          id: 1,
          title: "Brothers' Anguila Trip",
          details: '',
          startDate: new Date('3/15/2022'),
          endDate: new Date('3/20/2022'),
          destinations: [
            {
              destinationId: 1,
              city: 'Zemi Beach',
              region: 'West End',
              country: 'Anguilla',
            },
          ],
          members: [],
          photos: [],
          itinerary: [],
          toDo: [],
          imgUrl: 'assets/images/trips/anguila1.jpg',
        },
        {
          id: 2,
          title: 'Myrtle Beach and Charleston Family Vacay 2022',
          details: '',
          startDate: new Date('5/27/2022'),
          endDate: new Date('6/5/2022'),
          destinations: [
            {
              destinationId: 1,
              city: 'Myrtle Beach',
              region: 'South Carolina',
              country: 'United States',
            },
            {
              destinationId: 2,
              city: 'Charleston',
              region: 'South Carolina',
              country: 'United States',
            },
          ],
          members: [],
          photos: [],
          itinerary: [],
          toDo: [],
          imgUrl: 'assets/images/trips/myrtlebeach1.jpg',
        },
        {
          id: 3,
          title: 'Smoky Mountains Thanksgiving',
          details: '',
          startDate: new Date('11/23/2019'),
          endDate: new Date('11/30/2019'),
          destinations: [
            {
              destinationId: 1,
              city: 'Gatlinburg',
              region: 'Tennessee',
              country: 'United States',
            },
          ],
          members: [],
          photos: [],
          itinerary: [],
          toDo: [],
          imgUrl: 'assets/images/trips/gatlinburg1.jpg',
        },
        {
          id: 4,
          title: 'Hawaii Family Trip 2023',
          details: '',
          startDate: new Date('6/24/2023'),
          endDate: new Date('7/5/2023'),
          destinations: [
            {
              destinationId: 1,
              city: 'Maui',
              region: 'Hawaii',
              country: 'United States',
            },
          ],
          members: [],
          photos: [],
          itinerary: [],
          toDo: [],
          imgUrl: 'assets/images/trips/hawaii1.jpg',
        },
        {
          id: 5,
          title: 'Our Ireland Trip',
          details: '',
          startDate: new Date('3/11/2023'),
          endDate: new Date('3/20/2023'),
          destinations: [
            {
              destinationId: 1,
              city: 'Dublin',
              region: 'Lienster',
              country: 'Ireland',
            },
          ],
          members: [],
          photos: [],
          itinerary: [],
          toDo: [],
          imgUrl: 'assets/images/trips/ireland1.jpg',
        },
      ],
    };
  }
}
