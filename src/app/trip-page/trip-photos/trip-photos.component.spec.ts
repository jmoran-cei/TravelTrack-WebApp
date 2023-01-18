import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPhotosComponent } from './trip-photos.component';

describe('TripPhotosComponent', () => {
  let component: TripPhotosComponent;
  let fixture: ComponentFixture<TripPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
