import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletStocksTable } from './wallet-stocks-table';

describe('WalletStocksTable', () => {
  let component: WalletStocksTable;
  let fixture: ComponentFixture<WalletStocksTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletStocksTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletStocksTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
