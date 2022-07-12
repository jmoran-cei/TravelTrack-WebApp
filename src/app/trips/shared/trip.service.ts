import { LocationStrategy } from "@angular/common";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ITrip } from "./trip.model";

@Injectable()
export class TripService{

  getAllTrips() {
    let subject = new Subject()
    setTimeout(() => {subject.next(TRIPS); subject.complete();}, 100)
    console.log(subject)
    return subject
  }

  getTrip(id:number) {
    return TRIPS.find(trip => trip.id == id)
  }

  sortByTitle(trips:ITrip[]) {
    console.log("Trips sorted alphabetically by Title");
    return trips = trips.sort((a, b) => a.title.localeCompare(b.title))
  }

  sortByDate(trips:ITrip[]) {
    console.log("Trips sorted by Date");

    // MOST RECENT trips will be at the top (oldest trip will be the last one after scrolling down)
    return trips = trips.sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }
  
}

const TRIPS:ITrip[] = [
  {
    id: 1,
    title: 'Brothers\' Anguila Trip',
    //change dates to type Date (and on ITrip)
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

  }
]
