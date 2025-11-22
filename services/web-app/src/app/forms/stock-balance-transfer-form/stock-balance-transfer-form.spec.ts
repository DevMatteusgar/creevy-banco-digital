import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBalanceTransferForm } from './stock-balance-transfer-form';

describe('StockBalanceTransferForm', () => {
  let component: StockBalanceTransferForm;
  let fixture: ComponentFixture<StockBalanceTransferForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockBalanceTransferForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockBalanceTransferForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
