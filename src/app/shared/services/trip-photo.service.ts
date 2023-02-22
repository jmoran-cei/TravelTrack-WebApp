import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
  catchError,
  map,
  mergeMap,
  Observable,
  of,
  take,
} from 'rxjs';
import { TripService } from 'src/app/trips';
import { AuthService } from 'src/app/user';
import { environment } from 'src/environments/environment';
import { PendingFile, Trip, TripPhoto } from '..';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TripPhotoService {
  photosUrl = environment.TravelTrackAPI + '/trips'; // doesn't exist yet

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tripService: TripService,
    private webRequestService: WebRequestService
  ) {}

  detectChanges(changeDetection: ChangeDetectorRef) {
    changeDetection.detectChanges();
  }

  // ----------- CRUD Operations ------------
  // upload a trip photo
  uploadPhotoFile(fd: FormData, tripId: number): Observable<Trip> {
    //update
    return this.http
      .put<Trip>(`${this.photosUrl}/${tripId}/addphoto`, fd, this.webRequestService.headers)
      .pipe(catchError(this.webRequestService.handleError<Trip>('uploadImage()')));
  }

  // delete a trip photo
  deletePhotos(photos: TripPhoto[], tripId: number): Observable<Trip> {
    return this.http
      .put<Trip>(`${this.photosUrl}/${tripId}/removephotos`, photos, this.webRequestService.headers)
      .pipe(catchError(this.webRequestService.handleError<Trip>('deleteImage()')));
  }
  // --------------------------------------


  // ----------- Other Methods ------------

  // check for a duplicate file in provided file array
  isDuplicateFile(file: File, preexistingFiles: File[]): boolean {
    if(preexistingFiles.find(f => f.name === file.name) !== undefined) {
      return true;
    }
    return false;
  }

  // convert File[] into FormData[]
  filesToFormDataArray(files: File[], tripId: number): FormData[] {
    let formDataArray: FormData[] = [];

    // iterates through every file and creates appends it as formdata to formdata[]
    for (let file of files) {
      let savedFileName = `${tripId}-${file.name}`;
      var data = new FormData();

      data.append(`image-${savedFileName}`, file, savedFileName); // set file
      data.append('fileName', savedFileName);
      data.append('fileType', file.type);
      data.append('tripId', `${tripId}`);
      data.append('addedByUser', this.auth.getCurrentUser().username);
      data.append('alt', file.name);

      formDataArray.push(data);
    }
    return formDataArray;
  }

  // loops through each response to react accordingly:
  // track # of successful responses and add appropriate errors to files that failed
  // updated pendingFiles[] ==> removes successfully uploaded files and addresses errors per failed file
  // uploadMessage ==> varies based on: all failed, some failed, or all succeeded
  processResponses(pendingFiles$: Observable<PendingFile[]>, responses: Trip[]): Observable<(PendingFile[] | string)[]> {
    return pendingFiles$.pipe(
      map((pendingFiles) => {
        let successCount = 0; // count successful uploads
        let uploadMessage = 'Not all files uploaded. Check error(s) below.';

        let i = 0;
        for (let response of responses) {
          // successfully returns trip response
          if (response.id !== undefined) {
            successCount++;
            pendingFiles[i].ErrorMessage = '';
            i++;
            continue;
          }
          // failed responses: set error message for corresponding pendingFile
          if (response instanceof HttpErrorResponse) {
            pendingFiles[i].ErrorMessage = `File '${pendingFiles[i].File.name}' had trouble uploading. Try again later. \n${response.error.reasonPhrase}`;
            if (response.status === 409) {
              pendingFiles[i].ErrorMessage = `File name '${pendingFiles[i].File.name}' already exists for this trip.`;
            }
            i++;
            continue;
          }
          if (response instanceof Error) {
            pendingFiles[i].ErrorMessage = `File '${pendingFiles[i].File.name}' had trouble uploading. Try again later. \n${response.message}`;
          }
          pendingFiles[i].ErrorMessage = `File '${pendingFiles[i].File.name}' had trouble uploading. Try again later. Unknown error.`;
          i++;
          continue;
        }

        if (successCount === 0) {
          uploadMessage = 'All files failed. Check errors below.';
        }
        if (pendingFiles.length === successCount) {
          uploadMessage = 'Upload successful!';
        }

        // remove all files that succeeded to upload
        pendingFiles = pendingFiles.filter((pendingFile) => pendingFile.ErrorMessage !== '');

        // return updated pendingFiles & updated progressMessage
        return [pendingFiles, uploadMessage];
      }),
      take(1)
    );
  }

  // gets updated trip photos from API
  getUpdatedTripPhotos(tripId: number): Observable<TripPhoto[]> {
    return this.tripService.getTrip(tripId).pipe(
      map((trip) => trip.photos),
      take(1)
    );
  }

  // extracts each raw file from each PendingImage object in pendingImage$
  // returns the file array
  getFilesFromPendingFiles(pendingFiles: PendingFile[]): File[] {
    let files: File[] = [];
    for (let pendingFile of pendingFiles) {
      files.push(pendingFile.File);
    }
    return files;
  }

  // adds new pending image file
  addPendingFile(
    changeDetection: ChangeDetectorRef,
    pendingFiles$: Observable<PendingFile[]>,
    file: File,
    imgUrl: string
  ): void {
    pendingFiles$.pipe(take(1)).subscribe((pendingFiles) => {
      let newPendingImage: PendingFile = {
        File: file,
        ImgUrl: imgUrl,
        ErrorMessage: '',
      };
      pendingFiles.push(newPendingImage);
      this.detectChanges(changeDetection);
    });
  }

  // removes pending image file
  // returns true if the file was the last file in pendingFiles$
  removeFile(
    changeDetection: ChangeDetectorRef,
    pendingFiles$: Observable<PendingFile[]>,
    file: File
  ): Observable<boolean> {
    return pendingFiles$.pipe(
      mergeMap((pendingFiles: PendingFile[]): Observable<boolean> => {
        for (let i in pendingFiles) {
          if (pendingFiles[i].File === file) {
            pendingFiles.splice(+i, 1);
          }
        }
        this.detectChanges(changeDetection);
        if (pendingFiles.length === 0) {
          return of(true);
        }
        return of(false);
      }),
      take(1)
    );
  }
}
