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
          details:
            'Oremlay ipsumyay olorday itsay ametyay, onsectetuercay adipiscingyay elityay. Edsay itaevay eolay inyay iamday empersay orttitorpay. Ullamnay idyay augueyay. Aecenasmay atyay acuslay isquay islnay auctoryay imperdietyay. Integeryay incidunttay acinialay elitvay. Uspendissesay aretraphay. Uisday ariusvay. Ellentesquepay abitanthay orbimay istiquetray enectussay etyay etusnay etyay alesuadamay amesfay acyay urpistay egestasyay.',
          startDate: new Date('3/15/2022'),
          endDate: new Date('3/20/2022'),
          destinations: [
            {
              destinationId: 'ChIJw4OtEaZjDowRZCw_jCcczqI',
              city: 'Zemi Beach',
              region: 'West End',
              country: 'Anguilla',
            },
          ],
          members: [
            {
              username: 'jmoran@ceiamerica.com',
              password: 'P@ssw0rd',
              firstName: 'Jonathan',
              lastName: 'Moran',
              address: [],
              pictureURL: 'assets/images/dummy1.jpg'
            },
            {
              username: 'dummyuser@dummy.dum',
              password: 'P@ssw0rd',
              firstName: 'Dummy',
              lastName: 'User',
              address: [],
              pictureURL: 'assets/images/users/dummy1.jpg'
            },
            {
              username: 'fakeuser@fakey.fake',
              password: 'P@ssw0rd',
              firstName: 'Fake',
              lastName: 'User',
              address: [],
              pictureURL: 'assets/images/users/dummy1.jpg'
            }
          ],
          photos: [],
          itinerary: [],
          toDo: [
            {
              task: 'pack clothes',
              complete: false,
            },
            {
              task: 'get snacks',
              complete: true,
            },
            {
              task: 'remember to bring gas rewards card',
              complete: false,
            },
            {
              task: 'finish booking airbnb',
              complete: true,
            },
            {
              task: 'buy more toothpaste',
              complete: false,
            },
          ],
          imgUrl: 'assets/images/trips/anguila1.jpg',
        },
        {
          id: 2,
          title: 'Myrtle Beach and Charleston Family Vacay 2022',
          details: 'Oremlay ipsumyay olorday itsay ametyay, onsectetuercay adipiscingyay elityay. Edsay itaevay eolay inyay iamday empersay orttitorpay. Ullamnay idyay augueyay. Aecenasmay atyay acuslay isquay islnay auctoryay imperdietyay. Integeryay incidunttay acinialay elitvay. Uspendissesay aretraphay. Uisday ariusvay. Ellentesquepay abitanthay orbimay istiquetray enectussay etyay etusnay etyay alesuadamay amesfay acyay urpistay egestasyay.',
          startDate: new Date('5/27/2022'),
          endDate: new Date('6/5/2022'),
          destinations: [
            {
              destinationId: 'ChIJASFVO5VoAIkRGJbQtRWxD7w',
              city: 'Myrtle Beach',
              region: 'South Carolina',
              country: 'United States',
            },
            {
              destinationId: 'ChIJdySo3EJ6_ogRa-zhruD3-jU',
              city: 'Charleston',
              region: 'South Carolina',
              country: 'United States',
            },
          ],
          members: [
            {
              username: 'jmoran@ceiamerica.com',
              password: 'P@ssw0rd',
              firstName: 'Jonathan',
              lastName: 'Moran',
              address: [],
              pictureURL: 'assets/images/dummy1.jpg'
            },
            {
              username: 'dummyuser@dummy.dum',
              password: 'P@ssw0rd',
              firstName: 'Dummy',
              lastName: 'User',
              address: [],
              pictureURL: 'assets/images/users/dummy1.jpg'
            },
            {
              username: 'fakeuser@fakey.fake',
              password: 'P@ssw0rd',
              firstName: 'Fake',
              lastName: 'User',
              address: [],
              pictureURL: 'assets/images/users/dummy1.jpg'
            }
          ],
          photos: [],
          itinerary: [],
          toDo: [
            {
              task: 'pack clothes',
              complete: false,
            },
            {
              task: 'get snacks',
              complete: true,
            },
            {
              task: 'remember to bring gas rewards card',
              complete: false,
            },
            {
              task: 'finish booking airbnb',
              complete: true,
            },
            {
              task: 'buy more toothpaste',
              complete: false,
            },
          ],
          imgUrl: 'assets/images/trips/myrtlebeach1.jpg',
        },
        {
          id: 3,
          title: 'Smoky Mountains Thanksgiving',
          details:
            'Oremlay ipsumyay olorday itsay ametyay, onsectetuercay adipiscingyay elityay. Edsay itaevay eolay inyay iamday empersay orttitorpay. Ullamnay idyay augueyay. Aecenasmay atyay acuslay isquay islnay auctoryay imperdietyay. Integeryay incidunttay acinialay elitvay. Uspendissesay aretraphay. Uisday ariusvay. Ellentesquepay abitanthay orbimay istiquetray enectussay etyay etusnay etyay alesuadamay amesfay acyay urpistay egestasyay.',
          startDate: new Date('11/23/2019'),
          endDate: new Date('11/30/2019'),
          destinations: [
            {
              destinationId: 'ChIJiaUIy-pTWYgRqHm3fq7XsUo',
              city: 'Gatlinburg',
              region: 'Tennessee',
              country: 'United States',
            },
          ],
          members: [
            {
              username: 'jmoran@ceiamerica.com',
              password: 'P@ssw0rd',
              firstName: 'Jonathan',
              lastName: 'Moran',
              address: [],
              pictureURL: 'assets/images/dummy1.jpg'
            },
            {
              username: 'dummyuser@dummy.dum',
              password: 'P@ssw0rd',
              firstName: 'Dummy',
              lastName: 'User',
              address: [],
              pictureURL: 'assets/images/users/dummy1.jpg'
            },
            {
              username: 'fakeuser@fakey.fake',
              password: 'P@ssw0rd',
              firstName: 'Fake',
              lastName: 'User',
              address: [],
              pictureURL: 'assets/images/users/dummy1.jpg'
            }
          ],
          photos: [],
          itinerary: [],
          toDo: [
            {
              task: 'pack clothes',
              complete: false,
            },
            {
              task: 'get snacks',
              complete: true,
            },
            {
              task: 'remember to bring gas rewards card',
              complete: false,
            },
            {
              task: 'finish booking airbnb',
              complete: true,
            },
            {
              task: 'buy more toothpaste',
              complete: false,
            },
          ],
          imgUrl: 'assets/images/trips/gatlinburg1.jpg',
        },
        {
          id: 4,
          title: 'Hawaii Family Trip 2023',
          details:
            'Oremlay ipsumyay olorday itsay ametyay, onsectetuercay adipiscingyay elityay. Edsay itaevay eolay inyay iamday empersay orttitorpay. Ullamnay idyay augueyay. Aecenasmay atyay acuslay isquay islnay auctoryay imperdietyay. Integeryay incidunttay acinialay elitvay. Uspendissesay aretraphay. Uisday ariusvay. Ellentesquepay abitanthay orbimay istiquetray enectussay etyay etusnay etyay alesuadamay amesfay acyay urpistay egestasyay.',
          startDate: new Date('6/24/2023'),
          endDate: new Date('7/5/2023'),
          destinations: [
            {
              destinationId: 'ChIJ-endi8cqVXkRbpYfLncR5rI',
              city: 'Lahaina',
              region: 'Hawaii',
              country: 'United States',
            },
          ],
          members: [
            {
              username: 'dummyuser@dummy.dum',
              password: 'P@ssw0rd',
              firstName: 'Dummy',
              lastName: 'User',
              address: [],
              pictureURL: 'assets/images/users/dummy1.jpg'
            },
          ],
          photos: [],
          itinerary: [],
          toDo: [],
          imgUrl: 'assets/images/trips/hawaii1.jpg',
        },
        {
          id: 5,
          title: 'Our Ireland Trip',
          details:
            'Oremlay ipsumyay olorday itsay ametyay, onsectetuercay adipiscingyay elityay. Edsay itaevay eolay inyay iamday empersay orttitorpay. Ullamnay idyay augueyay. Aecenasmay atyay acuslay isquay islnay auctoryay imperdietyay. Integeryay incidunttay acinialay elitvay. Uspendissesay aretraphay. Uisday ariusvay. Ellentesquepay abitanthay orbimay istiquetray enectussay etyay etusnay etyay alesuadamay amesfay acyay urpistay egestasyay.',
          startDate: new Date('3/11/2023'),
          endDate: new Date('3/20/2023'),
          destinations: [
            {
              destinationId: 'ChIJL6wn6oAOZ0gRoHExl6nHAAo',
              city: 'Dublin',
              region: 'Lienster',
              country: 'Ireland',
            },
          ],
          members: [
            {
              username: 'dummyuser@dummy.dum',
              password: 'P@ssw0rd',
              firstName: 'Dummy',
              lastName: 'User',
              address: [],
              pictureURL: 'assets/images/users/dummy1.jpg'
            },
          ],
          photos: [],
          itinerary: [],
          toDo: [],
          imgUrl: 'assets/images/trips/ireland1.jpg',
        },
      ],
      Users: [
        {
          username: 'jmoran@ceiamerica.com',
          password: 'P@ssw0rd',
          firstName: 'Jonathan',
          lastName: 'Moran',
          address: [],
          pictureURL: 'assets/images/dummy1.jpg'
        },
        {
          username: 'dummyuser@dummy.dum',
          password: 'P@ssw0rd',
          firstName: 'Dummy',
          lastName: 'User',
          address: [],
          pictureURL: 'assets/images/users/dummy1.jpg'
        },
        {
          username: 'fakeuser@fakey.fake',
          password: 'P@ssw0rd',
          firstName: 'Fake',
          lastName: 'User',
          address: [],
          pictureURL: 'assets/images/users/dummy1.jpg'
        }
      ]
    };
  }
}
