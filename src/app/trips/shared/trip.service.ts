import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { ILocation } from "./location.model";
import { ITrip } from "./trip.model";

@Injectable()
export class TripService{

  getAllTrips():Observable<ITrip[]> {
    // this will be better implemented via http.get().pipe() when I update it (after implementing API)
    return of(TRIPS)
  }

  getTrip(id:number):ITrip {
    // this will be better implemented via http.get().pipe() when I update it (after implementing API)
    return TRIPS.find(trip => trip.id === id)!
  }

  sortByTitle(trips:ITrip[]) {
    // console.log("Trips sorted alphabetically by title");
    return trips = trips.sort((a:ITrip, b:ITrip) => a.title.localeCompare(b.title))
  }

  sortByEarliestDate(trips:ITrip[]) {  // default for PREVIOUS dates
    // console.log("Trips sorted by earliest date");

    // sorting by EARLIEST DATE: sorts dates oldest-newest
    return trips = trips.sort((a: ITrip, b: ITrip) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  }

  sortByLatestDate(trips:ITrip[]) { // default for UPCOMING dates
    // console.log("Trips sorted by latest date");

    // sorting by LATEST DATE: sorts dates newest-oldest
    return trips = trips.sort((a: ITrip, b: ITrip) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }

  multipleLocations(locations:ILocation[]) {
    if (locations.length > 1) {
      return true
    }
    return false
  }

}

const TRIPS:ITrip[] = [
  {
    id: 1,
    title: 'Brothers\' Anguila Trip',
    startDate: new Date('3/15/2022'),
    endDate: new Date('3/20/2022'),
    locations: [
      {
      locationId: 1,
      city: 'Zemi Beach',
      stateProv: 'West End',
      country: 'Anguilla',
      }
    ],
    members: [],
    pictures: [],
    itinerary: [],
    toDo: [],
    imgUrl: "assets/images/trips/anguila1.jpg"

  }, {
    id: 2,
    title: 'Myrtle Beach and Charleston Family Vacay 2022',
    startDate: new Date('5/27/2022'),
    endDate: new Date('6/5/2022'),
    locations: [
      { locationId: 1,
        city: 'Myrtle Beach',
        stateProv: 'South Carolina',
        country: 'United States'
      },
      {
        locationId: 2,
        city: 'Charleston',
        stateProv: 'South Carolina',
        country: 'United States'
      },
    ],
    members: [],
    pictures: [],
    itinerary: [],
    toDo: [],
    imgUrl: "assets/images/trips/myrtlebeach1.jpg"

  }, {
    id: 3,
    title: 'Smoky Mountains Thanksgiving',
    startDate: new Date('11/23/2019'),
    endDate: new Date('11/30/2019'),
    locations: [
      {
        locationId: 1,
        city: 'Gatlinburg',
        stateProv: 'Tennessee',
        country: 'United States'
      }
    ],
    members: [],
    pictures: [],
    itinerary: [],
    toDo: [],
    imgUrl: "assets/images/trips/gatlinburg1.jpg"
  },{
    id: 4,
    title: 'Hawaii Family Trip 2023',
    startDate: new Date('6/24/2023'),
    endDate: new Date('7/5/2023'),
    locations: [
      { locationId: 1,
        city: 'Maui',
        stateProv: 'Hawaii',
        country: 'United States'
      },
    ],
    members: [],
    pictures: [],
    itinerary: [],
    toDo: [],
    imgUrl: "assets/images/trips/hawaii1.jpg"

  },{
    id: 5,
    title: 'Our Ireland Trip',
    startDate: new Date('3/11/2023'),
    endDate: new Date('3/20/2023'),
    locations: [
      { locationId: 1,
        city: 'Dublin',
        stateProv: 'Lienster',
        country: 'Ireland'
      },
    ],
    members: [],
    pictures: [],
    itinerary: [],
    toDo: [],
    imgUrl: "assets/images/trips/ireland1.jpg"

  }
]
