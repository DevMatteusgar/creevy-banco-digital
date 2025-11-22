import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketGridTable } from './stock-market-grid-table';

describe('StockMarketGridTable', () => {
  let component: StockMarketGridTable;
  let fixture: ComponentFixture<StockMarketGridTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMarketGridTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMarketGridTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
