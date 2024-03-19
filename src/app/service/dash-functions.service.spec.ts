import { TestBed } from '@angular/core/testing';

import { DashFunctionsService } from './dash-functions.service';

describe('DashFunctionsService', () => {
  let service: DashFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
