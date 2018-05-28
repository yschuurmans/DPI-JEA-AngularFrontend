import { TestBed, inject } from '@angular/core/testing';

import { RestMessageService } from './rest-message.service';

describe('RestMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestMessageService]
    });
  });

  it('should be created', inject([RestMessageService], (service: RestMessageService) => {
    expect(service).toBeTruthy();
  }));
});
