import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPhotoComponent } from './trip-photo.component';

describe('TripPhotoComponent', () => {
  let component: TripPhotoComponent;
  let fixture: ComponentFixture<TripPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
