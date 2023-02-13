import { TestBed } from '@angular/core/testing';

import { TripPhotoService } from './trip-photo.service';

describe('TripPhotoService', () => {
  let service: TripPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
