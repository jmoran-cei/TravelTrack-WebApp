import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, take } from 'rxjs';
import { TripPhoto } from 'src/app/shared';

@Component({
  selector: 'app-trip-photo-full-view',
  templateUrl: './trip-photo-full-view.component.html',
  styleUrls: ['./trip-photo-full-view.component.css']
})
export class TripPhotoFullViewComponent implements OnChanges {
  initTrip: TripPhoto = {
    id: '',
    tripId: 0,
    fileName: '',
    fileType: '',
    path: '',
    addedByUser: '',
    alt: '',
  }
  @Input() displayFullView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() photos$?: Observable<TripPhoto[]>;
  @Input() displayedPhoto$?: BehaviorSubject<TripPhoto> = new BehaviorSubject(this.initTrip);
  @Input() currentIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  photosArrayLength?: number;

  get displayedPhoto() {
    return this.displayedPhoto$?.getValue();
  }

  get currentIndex() {
    return this.currentIndex$?.getValue()
  }

  constructor(
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnChanges(): void {
    this.photos$?.pipe(take(1)).subscribe((photos) => {
      this.photosArrayLength = photos.length;
    });
  }


  hideFullViewImg() {
    this.displayFullView$.next(false);
    this.changeDetection.detectChanges();
  }

  nextImage(i: number) {
    this.photos$?.pipe(take(1)).subscribe((photos) => {
      if (i > (photos.length - 1) || i < 0) {
        return
      }
      this.currentIndex$.next(i);
      this.displayedPhoto$?.next(photos[i]);
      this.changeDetection.detectChanges();
    })
  }

}
