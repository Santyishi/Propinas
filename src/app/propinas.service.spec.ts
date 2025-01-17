import { TestBed } from '@angular/core/testing';

import { PropinasService } from './propinas.service';

describe('PropinasService', () => {
  let service: PropinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
