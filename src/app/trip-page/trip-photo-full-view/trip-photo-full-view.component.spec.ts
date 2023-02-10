import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPhotoFullViewComponent } from './trip-photo-full-view.component';

describe('TripPhotoFullViewComponent', () => {
  let component: TripPhotoFullViewComponent;
  let fixture: ComponentFixture<TripPhotoFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripPhotoFullViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPhotoFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
