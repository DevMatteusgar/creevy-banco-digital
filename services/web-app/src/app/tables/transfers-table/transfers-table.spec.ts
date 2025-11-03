import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersTable } from './transfers-table';

describe('TransfersTable', () => {
  let component: TransfersTable;
  let fixture: ComponentFixture<TransfersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
