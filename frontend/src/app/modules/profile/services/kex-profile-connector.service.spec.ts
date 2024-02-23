import { TestBed } from '@angular/core/testing';

import { KexProfileConnectorService } from './kex-profile-connector.service';

describe('KexProfileConnectorService', () => {
  let service: KexProfileConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KexProfileConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
