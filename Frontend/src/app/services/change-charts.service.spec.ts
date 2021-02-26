import { TestBed } from '@angular/core/testing';

import { ChangeChartsService } from './change-charts.service';

describe('ChangeChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeChartsService = TestBed.get(ChangeChartsService);
    expect(service).toBeTruthy();
  });
});
