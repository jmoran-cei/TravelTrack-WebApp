import { TestBed } from '@angular/core/testing';
import { TravelAppComponent } from './travel-app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelAppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TravelAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'VacationTrack'`, () => {
    const fixture = TestBed.createComponent(TravelAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('VacationTrack');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TravelAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'VacationTrack app is running!'
    );
  });
});
