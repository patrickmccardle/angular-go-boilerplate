import { TestBed } from '@angular/core/testing';

import { Api } from './api.service';

describe('HelloWorldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelloWorldService = TestBed.get(HelloWorldService);
    expect(service).toBeTruthy();
  });
});
