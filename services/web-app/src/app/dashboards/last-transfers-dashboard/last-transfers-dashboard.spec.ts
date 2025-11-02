import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTransfersDashboard } from './last-transfers-dashboard';

describe('LastTransfersDashboard', () => {
  let component: LastTransfersDashboard;
  let fixture: ComponentFixture<LastTransfersDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastTransfersDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastTransfersDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
