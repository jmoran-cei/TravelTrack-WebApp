import { writeFile } from 'fs';

const targetPath = './src/environments/environment.ts';

const envConfigFile = `export const environment = {
  production: false,
  TravelTrackAPI: '${process.env?.['TRAVELTRACK_API_BASE_URL']}',
  TravelTrackAPIKey: '${process.env?.['TRAVELTRACK_API_KEY']}',
  GooglePlacesAPIKey: '${process.env?.['GOOGLE_PLACES_API_KEY']}'
};`;

writeFile(targetPath, envConfigFile, 'utf8', (error) => {
  if (error) {
    return console.log(error);
  }
});
