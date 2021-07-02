import { TestBed } from '@angular/core/testing';

import { DeviceService } from './tutorial.service';

describe('TutorialService', () => {
  let service: DeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
