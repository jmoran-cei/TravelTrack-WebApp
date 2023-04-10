import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsalRedirectComponent } from './msal-redirect.component';

describe('MsalRedirectComponent', () => {
  let component: MsalRedirectComponent;
  let fixture: ComponentFixture<MsalRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsalRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsalRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
