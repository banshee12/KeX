import { TestBed } from '@angular/core/testing';

import { DarkModeToggleService } from './dark-mode-toggle.service';

describe('DarkModeToggleService', () => {
  let service: DarkModeToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkModeToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
