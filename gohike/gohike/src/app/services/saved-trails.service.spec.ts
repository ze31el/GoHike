import { TestBed } from '@angular/core/testing';

import { SavedTrailsService } from './saved-trails.service';

describe('SavedTrailsService', () => {
  let service: SavedTrailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedTrailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
