import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransactionsTable } from './stock-transactions-table';

describe('StockTransactionsTable', () => {
  let component: StockTransactionsTable;
  let fixture: ComponentFixture<StockTransactionsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTransactionsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockTransactionsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
