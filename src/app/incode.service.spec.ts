import { TestBed } from '@angular/core/testing';

import { IncodeService } from './incode.service';

describe('IncodeService', () => {
  let service: IncodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
