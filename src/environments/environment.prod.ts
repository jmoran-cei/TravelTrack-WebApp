export const environment = {
  production: true,
  TravelTrackAPI: `${process.env?.['TRAVELTRACK_API_BASE_URL']}`,
  TravelTrackAPIKey: `${process.env?.['TRAVELTRACK_API_KEY']}`,
  GooglePlacesAPIKey: `${process.env?.['GOOGLE_PLACES_API_KEY']}`
};
