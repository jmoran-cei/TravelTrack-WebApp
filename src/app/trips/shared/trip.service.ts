import { LocationStrategy } from "@angular/common";
import { Injectable } from "@angular/core";
import { ILocation, ITrip } from "./trip.model";

@Injectable()
export class TripService{

  getAllTrips() {
    return TRIPS
  }

  getUpcomingOrPreviousTrips() {
    let currentTime = new Date()
    let upcomingTrips:ITrip[] = []
    let previousTrips:ITrip[] = []

    TRIPS.forEach(trip => {
      if (trip.startDate.getTime() >= currentTime.getTime()) {
        upcomingTrips.push(trip)
        console.log("upcoming")
      } else {
        previousTrips.push(trip)
        console.log("previous")
      }
    });

    // index 0: upcomingTrips
    // index 1: previous Trips
    return [upcomingTrips,previousTrips]
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
    imgUrl: "assets/images/anguila1.jpg"

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
    imgUrl: "assets/images/myrtlebeach1.jpg"

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
    imgUrl: "assets/images/gatlinburg1.jpg"
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
    imgUrl: "assets/images/hawaii1.jpg"

  }
]
