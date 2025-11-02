import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositForm } from './deposit-form';

describe('DepositForm', () => {
  let component: DepositForm;
  let fixture: ComponentFixture<DepositForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
