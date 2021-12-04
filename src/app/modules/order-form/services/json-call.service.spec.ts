import { TestBed } from '@angular/core/testing';

import { JsonCallService } from './json-call.service';

describe('JsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonCallService = TestBed.get(JsonCallService);
    expect(service).toBeTruthy();
  });
});
