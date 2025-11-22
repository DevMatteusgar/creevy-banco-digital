import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBalanceDashboard } from './wallet-balance-dashboard';

describe('WalletBalanceDashboard', () => {
  let component: WalletBalanceDashboard;
  let fixture: ComponentFixture<WalletBalanceDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletBalanceDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletBalanceDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
