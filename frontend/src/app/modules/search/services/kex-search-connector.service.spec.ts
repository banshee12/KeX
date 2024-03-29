import { TestBed } from '@angular/core/testing';

import { KexSearchConnectorService } from './kex-search-connector.service';

describe('KexSearchConnectorService', () => {
  let service: KexSearchConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KexSearchConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
