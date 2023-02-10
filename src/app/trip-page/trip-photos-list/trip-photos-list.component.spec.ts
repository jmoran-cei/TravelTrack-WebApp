import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPhotosListComponent } from './trip-photos-list.component';

describe('TripPhotosListComponent', () => {
  let component: TripPhotosListComponent;
  let fixture: ComponentFixture<TripPhotosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripPhotosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
