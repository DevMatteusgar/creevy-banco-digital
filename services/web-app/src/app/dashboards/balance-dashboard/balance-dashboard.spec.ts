import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDashboard } from './balance-dashboard';

describe('BalanceDashboard', () => {
  let component: BalanceDashboard;
  let fixture: ComponentFixture<BalanceDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
