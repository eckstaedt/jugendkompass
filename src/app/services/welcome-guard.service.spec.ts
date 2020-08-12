import { TestBed } from '@angular/core/testing';

import { WelcomeGuardService } from './welcome-guard.service';

describe('WelcomeGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WelcomeGuardService = TestBed.get(WelcomeGuardService);
    expect(service).toBeTruthy();
  });
});
