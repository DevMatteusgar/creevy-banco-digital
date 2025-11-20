import { TestBed } from '@angular/core/testing';

import { ApiChartService } from './api-chart-service';

describe('ApiChartService', () => {
  let service: ApiChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
