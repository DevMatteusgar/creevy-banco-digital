import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTransfersTable } from './last-transfers-table';

describe('LastTransfersTable', () => {
  let component: LastTransfersTable;
  let fixture: ComponentFixture<LastTransfersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastTransfersTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastTransfersTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
