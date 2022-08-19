import { TestBed } from '@angular/core/testing';

import { TrailDetailService } from './trail-detail.service';

describe('TrailDetailService', () => {
  let service: TrailDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
