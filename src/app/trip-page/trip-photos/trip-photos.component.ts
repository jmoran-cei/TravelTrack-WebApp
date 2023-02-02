import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { Trip, TripPhoto, PendingFile } from 'src/app/shared';
import { TripPhotoService } from 'src/app/shared/services/trip-photo.service';

@Component({
  selector: 'app-trip-photos',
  templateUrl: './trip-photos.component.html',
  styleUrls: ['./trip-photos.component.css'],
})
export class TripPhotosComponent implements OnInit {
  trip!: Trip;
  pendingFiles$: Observable<PendingFile[]> = of([]);
  tripPhotos$: Observable<TripPhoto[]> = of([]);
  requiredFileType: string = '.jpg, .png';
  progressMessage: string = '';
  hideProgress: boolean = true;
  disableUploadBtn: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private tripPhotoService: TripPhotoService,
    public changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.parent?.data.forEach((data) => {
      this.trip = data['trip'];
    });

    this.tripPhotos$ = of(this.trip.photos);
  }

  // user selected files from device ==> add files to pending images array
  onFileSelected(event: Event): void {
    this.progressMessage = 'Adding files...';
    this.hideProgress = false;
    this.changeDetection.detectChanges();

    this.pendingFiles$
      .pipe(
        // get raw files from pendingFiles array
        map((pendingFiles) =>
          this.tripPhotoService.getFilesFromPendingFiles(pendingFiles)
        ),
        // get only nonduplicates (user can't reselect the same file)
        map((preexistingFiles: File[]) => {
          let files: FileList = (event.target as HTMLInputElement).files!;
          let nonDuplicateFiles: File[] = [];

          for (let file of files) {
            let isDuplicate = this.tripPhotoService.isDuplicateFile(file,preexistingFiles);

            // as long as the file is not a duplicate filename of one that is already pending
            if (!isDuplicate) {
              // push to new files array
              nonDuplicateFiles.push(file);
            }
          }
          return nonDuplicateFiles;
        }),
        take(1)
      )
      .subscribe((files) => {
        if (files.length === 0) {
          // if no files selected: reset progress message
          this.progressMessage = '';
        }
        this.uploadDocuments(files);
      });
  }

  // asynchronously reads the images for the corresponding pending files
  // updates UI per image read
  // waits for all files to be read before allowing upload
  uploadDocuments = async (files: File[]) => {
    const filePromises = files.map((file: File) => {
      // promise per file
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            // set imgUrl for displaying on page
            let imgUrl = reader.result as string;
            const response = this.tripPhotoService.addPendingFile(
              this.changeDetection,
              this.pendingFiles$,
              file,
              imgUrl
            );

            // Resolve the promise with the response value
            resolve(response);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    // Wait for all promises to be resolved
    await Promise.all(filePromises);
    this.progressMessage = 'Files are ready for upload!';
    this.hideProgress = true;
    this.disableUploadBtn = false;
    this.changeDetection.detectChanges();
  };

  // upload all pending files
  onUpload(): void {
    this.progressMessage = 'Uploading...';
    this.hideProgress = false;
    this.changeDetection.detectChanges();

    this.pendingFiles$
    .pipe(
      // pass through a files array from PendingFile[]
      map((pendingFiles: PendingFile[]) => {
          return this.tripPhotoService.getFilesFromPendingFiles(pendingFiles);
        }),
      // perform API requests and maintain order
      // return original files & responses
      switchMap((files: File[]): Observable<(boolean | PendingFile[] | string)[]> => {
        // submission validation
        if (files.length === 0 || files === null) {
          return of([false]);
        }

        // convert file array into formdata array
        let filesAsFormData = this.tripPhotoService.filesToFormDataArray(
          files,
          this.trip.id
          );

        // submit upload requests for each formdata
        const responses$ = filesAsFormData.map((file) => {
          return this.tripPhotoService
          .uploadPhotoFile(file, this.trip.id)
          .pipe(
            catchError((err) => {
              console.log(err);
              return of(err);
            })
            );
          });

        // wait for all responses to be recieved
        return forkJoin(responses$).pipe(
          // process responses to update page data (pendingFiles[] and tripPhotos[]) and UI
          mergeMap((result: Trip[] | boolean) => {
            // submission failed validation
            if ((result as boolean) === false) {
              return of([false] as boolean[]);
            }

            // update pending files (failures get errors, successes gets removed)
            // set progressMesage value
            return this.tripPhotoService.processResponses(this.pendingFiles$, result as Trip[]);
          }))
        }),
      // return false if validation failed
      // reset pendingFiles & progress message
      switchMap(
        (result: (boolean | PendingFile[] | string)[] ): Observable<boolean | TripPhoto[]> => {
          // submission validation
          if (result[0] as boolean  === false) {
            return of(false);
          }

          // update pending files for UI
          this.pendingFiles$ = of(result[0] as PendingFile[]);

          // update progress message for UI
          this.progressMessage = result[1] as string;

          // return updated photos
          return this.tripPhotoService.getUpdatedTripPhotos(this.trip.id);
          }
        ),
      take(1))
      // returns false if validation failed
      // return trip photos (at least one response was successful and validation passed)
    .subscribe((result: (boolean | TripPhoto[])) => {
      if (result as boolean === false) {
        this.progressMessage = 'Upload failed. Try again.';
      }
      else {
        this.tripPhotos$ = of(result as TripPhoto[]);
      }
      this.hideProgress = true;
      this.changeDetection.detectChanges();
      return;
    });
  }

  // removes provided file from pendingFiles$
  // if last file, update UI accordingly
  removePendingFile(file: File): void {
    this.tripPhotoService
      .removeFile(this.changeDetection, this.pendingFiles$, file)
      .subscribe((isLastFile) => {
        if (isLastFile) {
          this.progressMessage = '';
          this.disableUploadBtn = true;
        }
        this.changeDetection.detectChanges();
      });
  }

  // resets pending files array and updates UI
  removeAllPendingFiles(): void {
    this.pendingFiles$.pipe(take(1)).subscribe((pendingFiles) => {
      pendingFiles.length = 0;
      this.disableUploadBtn = true;
      this.progressMessage = '';
      this.changeDetection.detectChanges();
    });
  }
}
