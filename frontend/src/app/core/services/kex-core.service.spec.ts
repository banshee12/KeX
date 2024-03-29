import { TestBed } from '@angular/core/testing';

import { KexCoreService } from './kex-core.service';

describe('KexCoreService', () => {
  let service: KexCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KexCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
