import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionManagement } from './prescription-management';

describe('PrescriptionManagement', () => {
  let component: PrescriptionManagement;
  let fixture: ComponentFixture<PrescriptionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrescriptionManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(PrescriptionManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
