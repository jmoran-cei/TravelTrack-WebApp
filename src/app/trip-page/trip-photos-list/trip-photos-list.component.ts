import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, take } from 'rxjs';
import { TripPhoto, TripPhotoService } from 'src/app/shared';

@Component({
  selector: 'app-trip-photos-list',
  templateUrl: './trip-photos-list.component.html',
  styleUrls: ['./trip-photos-list.component.css'],
})
export class TripPhotosListComponent {
  initTripPhoto: TripPhoto = {
    id: '',
    tripId: 0,
    fileName: '',
    fileType: '',
    path: '',
    addedByUser: '',
    alt: '',
  }
  @Input() tripPhotos$: Observable<TripPhoto[]> = of([]);
  @ViewChildren('photoselect') private photos!: QueryList<ElementRef>;
  progressMessage$: BehaviorSubject<string> = new BehaviorSubject('');
  selectedCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  toggleSelectAll$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  disableDeleteButton$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  // values for trip-photo-full-view child component
  displayFullView$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  displayedFullPhoto$?: BehaviorSubject<TripPhoto> = new BehaviorSubject(this.initTripPhoto);
  displayedFullPhotoIndex$: BehaviorSubject<number> = new BehaviorSubject(-1);

  constructor(
    private tripPhotoService: TripPhotoService,
    private changeDetection: ChangeDetectorRef
  ) {}

  detect() {
    this.changeDetection.detectChanges();
  }

  select() {
    let selectedCount = 0;
    this.photos.forEach((photoElement: ElementRef) => {
      if (photoElement.nativeElement.checked) {
        selectedCount++;
      }
    })
    if (selectedCount === 0) {
      this.toggleSelectAll$.next(false);
      this.disableDeleteButton$.next(true);
    } else {
      this.toggleSelectAll$.next(true);
      this.disableDeleteButton$.next(false);
    }
    this.selectedCount$.next(selectedCount);
    this.detect(); // updates UI for use case that photo(s) were deleted or uploaded before selecting
  }

  displayFullViewImg(photo: TripPhoto, index: number): void {
    this.displayedFullPhotoIndex$.next(index);
    this.displayFullView$.next(true);
    this.displayedFullPhoto$?.next(photo);
    this.detect(); // updates UI for use case that photo(s) were deleted or uploaded before selecting
  }

  selectAll(): void {
    // if not all selected already --> select all

      if (this.toggleSelectAll$.getValue() === false) {
        for (let p of this.photos) {
          p.nativeElement.checked = true;
        }
        this.selectedCount$.next(this.photos.length);
        this.toggleSelectAll$.next(true);
        this.disableDeleteButton$.next(false);
      } else {
        // clear selection
        for (let p of this.photos) {
          p.nativeElement.checked = false;
        }
        this.selectedCount$.next(0);
        this.toggleSelectAll$.next(false);
        this.disableDeleteButton$.next(true);
      }
      this.detect() // updates UI for use case that photo(s) were deleted or uploaded before selecting

  }

  removePhotos(): void {
    let photoFileNames: string[] = [];
    let photosToRemove: TripPhoto[] = [];

    // create array with filenames of selected photos
    for (let p of this.photos) {
      if (p.nativeElement.checked) {
        photoFileNames.push(p.nativeElement.id);
      }
    }

    // validation
    if (photoFileNames.length < 1) {
      return;
    }
    // update UI that photo removal process has began
    this.progressMessage$.next('Removing photos...');

    // grab photo files by filenames in filename array
    this.tripPhotos$.pipe(take(1)).subscribe((photos) => {
      for (let pFileName of photoFileNames) {
        let tripPhotoObj = photos.find((tripPhoto) => tripPhoto.fileName === pFileName)!;
        if (tripPhotoObj !== undefined) {
          photosToRemove.push(tripPhotoObj);
        }
      }

      // delete photos via API
      this.tripPhotoService
        .deletePhotos(photosToRemove, photos[0].tripId)
        .pipe(take(1))
        .subscribe({
          next: (updatedTrip) => {
            // update trip photos
            this.tripPhotos$ = of(updatedTrip.photos);

            // UI changes
            this.selectedCount$.next(0);
            this.toggleSelectAll$.next(false);
            this.progressMessage$.next('Photos Deleted!');
            this.disableDeleteButton$.next(true);

            // clear message after a few seconds
            setTimeout(() => {
              this.progressMessage$.next('');
            }, 3000);
          },
          error: () => {
            this.toggleSelectAll$.next(false);
            this.progressMessage$.next('Something went wrong. Try again.');
          },
        });
    });
  }

}
