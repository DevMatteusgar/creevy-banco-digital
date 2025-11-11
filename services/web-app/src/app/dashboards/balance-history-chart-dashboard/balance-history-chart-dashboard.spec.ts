import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceHistoryChartDashboard } from './balance-history-chart-dashboard';

describe('BalanceHistoryChartDashboard', () => {
  let component: BalanceHistoryChartDashboard;
  let fixture: ComponentFixture<BalanceHistoryChartDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceHistoryChartDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceHistoryChartDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
