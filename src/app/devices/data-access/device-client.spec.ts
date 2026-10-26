import { TestBed } from '@angular/core/testing';
import { DeviceClient } from './device-client';

describe('DeviceClient', () => {
  let service: DeviceClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
