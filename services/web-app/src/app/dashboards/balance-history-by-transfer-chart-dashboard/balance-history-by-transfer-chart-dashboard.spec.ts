import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceHistoryByTransferChartDashboard } from './balance-history-by-transfer-chart-dashboard';

describe('BalanceHistoryByTransferChartDashboard', () => {
  let component: BalanceHistoryByTransferChartDashboard;
  let fixture: ComponentFixture<BalanceHistoryByTransferChartDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceHistoryByTransferChartDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceHistoryByTransferChartDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
