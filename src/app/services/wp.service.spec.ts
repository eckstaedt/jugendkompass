import { TestBed } from '@angular/core/testing';

import { WpService } from './wp.service';

describe('WpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpService = TestBed.get(WpService);
    expect(service).toBeTruthy();
  });
});
