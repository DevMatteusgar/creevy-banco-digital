import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStockDashboard } from './buy-stock-dashboard';

describe('BuyStockDashboard', () => {
  let component: BuyStockDashboard;
  let fixture: ComponentFixture<BuyStockDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyStockDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyStockDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
