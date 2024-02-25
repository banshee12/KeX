import { TestBed } from '@angular/core/testing';

import { KexProfileService } from './kex-profile.service';

describe('KexProfileService', () => {
  let service: KexProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KexProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
