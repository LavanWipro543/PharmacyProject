import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistDashboard } from './pharmacist-dashboard';

describe('PharmacistDashboard', () => {
  let component: PharmacistDashboard;
  let fixture: ComponentFixture<PharmacistDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PharmacistDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(PharmacistDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
