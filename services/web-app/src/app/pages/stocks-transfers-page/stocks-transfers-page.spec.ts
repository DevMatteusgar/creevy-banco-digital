import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksTransfersPage } from './stocks-transfers-page';

describe('StocksTransfersPage', () => {
  let component: StocksTransfersPage;
  let fixture: ComponentFixture<StocksTransfersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksTransfersPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksTransfersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
