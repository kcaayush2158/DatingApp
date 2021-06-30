import { TestBed } from '@angular/core/testing';

import { EventEmmitterService } from './event-emmitter.service';

describe('EventEmmitterService', () => {
  let service: EventEmmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventEmmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
