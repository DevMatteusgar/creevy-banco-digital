import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiChart } from './api-chart';

describe('ApiChart', () => {
  let component: ApiChart;
  let fixture: ComponentFixture<ApiChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
