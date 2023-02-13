import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { mergeMap, Observable, of, take } from 'rxjs';
import { TripPhoto } from 'src/app/shared';

@Component({
  selector: 'app-trip-photo-full-view',
  templateUrl: './trip-photo-full-view.component.html',
  styleUrls: ['./trip-photo-full-view.component.css'],
})
export class TripPhotoFullViewComponent {
  @Input() displayFullView$!: Observable<boolean>;
  @Input() photos$: Observable<TripPhoto[]> = of([]);
  @Input() displayedPhoto$!: Observable<TripPhoto>;
  @Input() currentIndex$!: Observable<number>;


  constructor(
    private changeDetection: ChangeDetectorRef
  ) { }

  // closes the full view
  hideFullViewImg() {
    this.displayFullView$ = of(false);
    this.changeDetection.detectChanges(); // updates UI for use case that photo(s) were deleted or uploaded before selecting
  }

  // i = -1 --> display image to left
  // i = 1 --> display image to the right
  // updates displayedPhoto$ and currentIndex$
  nextImage(i: number) {
    this.currentIndex$
      .pipe(
        mergeMap((currentIndex): Observable<number> => {
          // increment or decrement currentIndex
          currentIndex = currentIndex + i;

          return this.photos$.pipe(
            mergeMap((photos): Observable<any> => {
              // update photo
              this.displayedPhoto$ = of(photos[currentIndex]);

              return of(currentIndex);
            })
          );
        }),
        take(1)
      )
      .subscribe((v) => {
        // update index
        this.currentIndex$ = of(v);
        this.changeDetection.detectChanges(); // updates UI for use case that photo(s) were deleted or uploaded before selecting
      });
  }
}
