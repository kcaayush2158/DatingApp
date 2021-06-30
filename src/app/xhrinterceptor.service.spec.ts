import { TestBed } from '@angular/core/testing';

import { XHRInterceptorService } from './xhrinterceptor.service';

describe('XHRInterceptorService', () => {
  let service: XHRInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XHRInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
